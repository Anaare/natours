interface PicturesCardProps {
  src: string;
  name: string;
  className: string;
}

const PicturesCard = ({ src, name, className }: PicturesCardProps) => {
  return (
    <div className="picture-box">
      <img className={className} src={`/img/tours/${src}`} alt={name} />
    </div>
  );
};

export default PicturesCard;
