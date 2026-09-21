'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, CheckCircle2, RefreshCw, Shield } from 'lucide-react';
import type { FormField } from '@/types/application';

interface FormPreviewProps {
  applicationId: string;
  onGenerate: (formData: Record<string, string>, fields: FormField[]) => void;
  onBack: () => void;
}

export default function FormPreview({ applicationId, onGenerate, onBack }: FormPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  const generateForm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}/generate`, {
        method: 'POST',
      });
      const data = await res.json();
      setFormData(data.filledFormData || {});
      setFormFields(data.formFields || []);
      setGenerated(true);
    } catch (error) {
      console.error('Generate error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateForm();
  }, [applicationId]);

  const sections = formFields.reduce<Record<string, FormField[]>>((acc, field) => {
    const section = field.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {});

  const filledCount = Object.values(formData).filter(Boolean).length;
  const totalCount = formFields.filter((f) => f.required).length;

  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2 text-sm">
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="mb-6">
        <div className="text-label mb-1.5">STEP 6 OF 7</div>
        <h2 className="text-heading-lg mb-1">Review Your Application</h2>
        <p className="text-[#6b7280] text-sm">
          Fields highlighted in{' '}
          <span className="inline-block px-2 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8] text-xs font-medium">blue</span>{' '}
          were auto-filled from DigiLocker. You can edit any field before downloading.
        </p>
      </div>

      {loading ? (
        <div className="card py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-4">
            <RefreshCw size={28} className="text-[#1a73e8] animate-spin" />
          </div>
          <h3 className="font-semibold text-[#1f2937] mb-2">Auto-filling Your Application...</h3>
          <p className="text-sm text-[#6b7280]">Extracting data from your DigiLocker documents.</p>
        </div>
      ) : generated ? (
        <>
          {/* Progress Bar */}
          <div className="card mb-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-[#1a73e8]">Auto-fill Progress</span>
                <span className="text-[#6b7280]">{filledCount}/{totalCount} required fields</span>
              </div>
              <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${totalCount > 0 ? (filledCount / totalCount) * 100 : 0}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-[#1a73e8] rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#16a34a] font-medium">
              <Shield size={15} />
              DigiLocker Verified
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-4 mb-5">
            {Object.entries(sections).map(([sectionName, fields], sIdx) => (
              <motion.div
                key={sectionName}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sIdx * 0.1 }}
                className="card"
              >
                <h3 className="text-label mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#1a73e8] rounded-full" />
                  {sectionName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map((field) => {
                    const value = formData[field.fieldId] || '';
                    const isAutoFilled = !!value && (field.sourceDocument || field.sourceField);
                    const isEditing = editingField === field.fieldId;

                    return (
                      <div key={field.fieldId} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                        <label className="form-label">
                          {field.required && <span className="text-[#dc2626] mr-1">*</span>}
                          {field.label}
                          {isAutoFilled && (
                            <span className="ml-2 text-[10px] font-bold text-[#1a73e8] bg-[#e8f0fe] px-1.5 py-0.5 rounded">
                              AUTO-FILLED
                            </span>
                          )}
                        </label>

                        <div className="relative">
                          {isEditing ? (
                            <div className="flex gap-2">
                              {field.type === 'textarea' ? (
                                <textarea
                                  className="form-input flex-1 min-h-[80px] resize-none"
                                  value={value}
                                  autoFocus
                                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.fieldId]: e.target.value }))}
                                />
                              ) : field.type === 'select' && field.options ? (
                                <select
                                  className="form-input flex-1"
                                  value={value}
                                  autoFocus
                                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.fieldId]: e.target.value }))}
                                >
                                  <option value="">Select...</option>
                                  {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                                </select>
                              ) : (
                                <input
                                  type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                                  className="form-input flex-1"
                                  value={value}
                                  autoFocus
                                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.fieldId]: e.target.value }))}
                                />
                              )}
                              <button
                                onClick={() => setEditingField(null)}
                                className="btn-primary px-3 py-2 text-xs"
                              >
                                <CheckCircle2 size={13} />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => setEditingField(field.fieldId)}
                              className={`form-input cursor-pointer hover:border-[#1a73e8] flex items-center justify-between group ${
                                isAutoFilled ? 'form-field-autofilled' : !value ? 'border-dashed border-[#fca5a5] bg-[#fef2f2]' : ''
                              }`}
                            >
                              <span className={value ? '' : 'text-[#d1d5db] text-sm italic'}>
                                {value || (field.required ? 'Required — click to enter' : 'Optional — click to enter')}
                              </span>
                              <Edit3
                                size={13}
                                className="text-[#9ca3af] group-hover:text-[#1a73e8] flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onGenerate(formData, formFields)}
              className="btn-primary"
            >
              Looks Good! Continue to Submit / Download →
            </button>
            <button onClick={generateForm} className="btn-ghost">
              <RefreshCw size={14} />
              Re-generate
            </button>
            <button onClick={onBack} className="btn-ghost">Back</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
