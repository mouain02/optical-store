import Section from "../../../components/admin/Section";


function ReviewsTab({
  reviews,
}) {

  return (
    <div className="admin-tab">

      <Section
        title={`Reviews (${reviews.length})`}
      >

        {reviews.length === 0 ? (

          <p>
            No reviews found
          </p>

        ) : (

          <div className="admin-reviews-list">

            {reviews.map((review) => (

              <div
                key={review._id}
                className="admin-review-card"
              >

                <div className="review-header">

                  <h3>
                    {review.user?.name ||
                      review.name ||
                      "Customer"}
                  </h3>


                  <span>
                    ⭐ {review.rating || 0}/5
                  </span>

                </div>


                <div className="review-product">

                  {review.product?.name && (
                    <p>
                      Product: {review.product.name}
                    </p>
                  )}

                </div>


                <p className="review-comment">

                  {review.comment ||
                    review.text ||
                    "No comment"}

                </p>


                <small>

                  {review.createdAt
                    ? new Date(
                        review.createdAt
                      ).toLocaleDateString()
                    : ""}

                </small>


              </div>

            ))}

          </div>

        )}

      </Section>

    </div>
  );
}


export default ReviewsTab;