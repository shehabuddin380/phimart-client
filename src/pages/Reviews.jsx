import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApiClient
      .get("/products/reviews/")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-base-content/60">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-base-100 border border-base-300 shadow">
              <div className="card-body">
                <h2 className="card-title">{review.product}</h2>
                <div className="flex items-center gap-1">
                  {"★".repeat(review.ratings)}{"☆".repeat(5 - review.ratings)}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;