'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info } from 'lucide-react';
import type { FollowUpQuestion } from '@/types/application';

interface FollowUpQuestionsProps {
  state: string;
  category: string;
  applicationType: string;
  templateId: string;
  answers: Record<string, string | boolean | number>;
  onSubmit: (answers: Record<string, string | boolean | number>, appId: string) => void;
  onBack: () => void;
}

export default function FollowUpQuestions({
  state, category, applicationType, templateId, answers: initialAnswers, onSubmit, onBack,
}: FollowUpQuestionsProps) {
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | boolean | number>>(initialAnswers);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/templates/${templateId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.followUpQuestions) {
          setQuestions(data.followUpQuestions);
        }
      })
      .finally(() => setLoading(false));
  }, [templateId]);

  const visibleQuestions = questions.filter((q) => {
    if (!q.dependsOn) return true;
    const depAnswer = answers[q.dependsOn.questionId];
    return String(depAnswer).includes(q.dependsOn.value);
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const q of visibleQuestions) {
      if (q.required && (answers[q.id] === undefined || answers[q.id] === '')) {
        newErrors[q.id] = 'This field is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Create or update application
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, category, applicationType }),
      });
      const app = await res.json();

      // Update follow-up answers
      await fetch(`/api/applications/${app.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followUpAnswers: answers, status: 'IN_PROGRESS', currentStep: 4 }),
      });

      onSubmit(answers, app.id);
    } catch (error) {
      console.error('Submit follow-up error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const setAnswer = (id: string, value: string | boolean | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((e) => { const n = { ...e }; delete n[id]; return n; });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-64 rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="card space-y-2 p-5">
            <div className="skeleton h-4 w-48 rounded" />
            <div className="skeleton h-10 w-full rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="btn-ghost mb-4 -ml-2 text-sm">
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="mb-6">
        <div className="text-label mb-1.5">STEP 4 OF 7</div>
        <h2 className="text-heading-lg mb-1">A Few More Details</h2>
        <p className="text-[#6b7280] text-sm">
          Answer these questions to help us customize your application form accurately.
          {questions.length} questions — takes about 2 minutes.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {visibleQuestions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card p-5"
          >
            <label className="block mb-2">
              <span className="text-sm font-semibold text-[#1f2937]">
                {q.required && <span className="text-[#dc2626] mr-1">*</span>}
                {q.question}
              </span>
              {q.helperText && (
                <span className="flex items-center gap-1 mt-1 text-xs text-[#6b7280]">
                  <Info size={11} />
                  {q.helperText}
                </span>
              )}
            </label>

            {q.type === 'text' && (
              <input
                type="text"
                className={`form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`}
                placeholder={q.placeholder || ''}
                value={String(answers[q.id] || '')}
                onChange={(e) => setAnswer(q.id, e.target.value)}
              />
            )}

            {q.type === 'number' && (
              <input
                type="number"
                className={`form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`}
                placeholder={q.placeholder || ''}
                value={String(answers[q.id] || '')}
                onChange={(e) => setAnswer(q.id, e.target.value)}
              />
            )}

            {q.type === 'date' && (
              <input
                type="date"
                className={`form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`}
                value={String(answers[q.id] || '')}
                onChange={(e) => setAnswer(q.id, e.target.value)}
              />
            )}

            {q.type === 'select' && q.options && (
              <select
                className={`form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`}
                value={String(answers[q.id] || '')}
                onChange={(e) => setAnswer(q.id, e.target.value)}
              >
                <option value="">Select an option...</option>
                {q.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {q.type === 'radio' && q.options && (
              <div className="flex flex-col gap-2 mt-1">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => setAnswer(q.id, opt)}
                      className="w-4 h-4 text-[#1a73e8]"
                    />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {errors[q.id] && (
              <p className="form-error mt-1">{errors[q.id]}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary"
        >
          {submitting ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
          ) : (
            'Continue to Document Check →'
          )}
        </button>
        <button onClick={onBack} className="btn-secondary">Back</button>
      </div>
    </div>
  );
}
