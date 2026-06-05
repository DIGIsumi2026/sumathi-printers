import Reveal from './Reveal';

type BadgeProps = {
  left: string;
  right?: string;
};

export default function Badge({ left, right }: BadgeProps) {
  return (
    <div className="badge">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}