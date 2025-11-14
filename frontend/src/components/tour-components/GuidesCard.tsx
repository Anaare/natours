interface GuidesCardProps {
  src: string;
  role: string;
  name: string;
}

const GuidesCard = ({ src, role, name }: GuidesCardProps) => {
  return (
    <div className="overview-box__detail">
      <img
        src={`/img/users/${src}`}
        alt="Lead guide"
        className="overview-box__img"
      />
      <span className="overview-box__label">{role}</span>
      <span className="overview-box__text">{name}</span>
    </div>
  );
};

export default GuidesCard;
