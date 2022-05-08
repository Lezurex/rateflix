import ReactStars from "react-rating-stars-component";

export interface RatingElementProps {
  rating: {
    summary?: string | null;
    description?: string | null;
    points?: number;
  };
}

export function RatingElement({ rating }: RatingElementProps) {
  return (
    <div className="border border-primary-80 p-3 rounded-2xl">
      <ReactStars
        count={5}
        edit={false}
        value={rating.points}
        activeColor="#4D6F48"
        size={50}
        color="#EEEEEE"
      />
      <h3 className="text-xl font-bold">{rating.summary}</h3>
      <p>{rating.description}</p>
    </div>
  );
}
