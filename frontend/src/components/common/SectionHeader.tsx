import Badge from './Badge';
import Reveal from './Reveal';
import RevealTitle from './RevealTitle';
import { ButtonLink } from './Buttons';

type SectionHeaderProps = {
  badgeLeft: string;
  badgeRight: string;
  title: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  centered?: boolean;
};

export default function SectionHeader({ badgeLeft, badgeRight, title, text, buttonLabel, buttonHref, centered = false }: SectionHeaderProps) {
  if (centered) {
    return (
      <div className="container centered-head">
        <Badge left={badgeLeft} right={badgeRight} />
        <RevealTitle text={title} />
        {text ? <Reveal className="section-intro"><p>{text}</p></Reveal> : null}
      </div>
    );
  }

  return (
    <div className="container section-head two-column">
      <div>
        <Badge left={badgeLeft} right={badgeRight} />
        <RevealTitle text={title} />
      </div>
      {(text || buttonLabel) ? (
        <Reveal className="head-side" direction="right">
          {text ? <p>{text}</p> : null}
          {buttonLabel && buttonHref ? <ButtonLink label={buttonLabel} href={buttonHref} /> : null}
        </Reveal>
      ) : null}
    </div>
  );
}
