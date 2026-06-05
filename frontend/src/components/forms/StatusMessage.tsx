import type { FormStatus } from '../../types/site';

type StatusMessageProps = {
  status: FormStatus;
  success: string;
};

export default function StatusMessage({ status, success }: StatusMessageProps) {
  if (status === 'idle' || status === 'loading') return null;

  return (
    <p className={`status ${status}`}>
      {status === 'success' ? success : 'Something went wrong. Please make sure the backend is running.'}
    </p>
  );
}
