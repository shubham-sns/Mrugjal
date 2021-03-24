import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { Actions } from 'components/post/actions';
import { Header } from './header';
import { Footer } from './footer';
import { Comments } from './comments';

function Post({ postData }) {
  return (
    <div className="rounded col-span-4 bg-white border border-gray-primary mb-12">
      <Header user={postData.user} />

      <Link to={`/p/${postData.photoId}`}>
        <Image
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          publicId={postData.imageSrc}
          width="680"
          crop="scale"
          alt={postData.caption}
        />
      </Link>

      <Actions
        postDocId={postData.docId}
        postId={postData.photoId}
        userId={postData.userId}
        totalLikes={postData.likes.length}
        likedPost={postData.userLikedPhoto}
        savedPost={postData.userSavedPhoto}
        link
      />

      <Footer username={postData.user.username} caption={postData.caption} />

      <Comments
        docId={postData.docId}
        postComments={postData.comments}
        datePosted={postData.dateCreated}
      />
    </div>
  );
}

Post.propTypes = {
  postData: PropTypes.exact({
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    saved: PropTypes.arrayOf(PropTypes.string),
    photoId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    userSavedPhoto: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      verifiedUser: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export { Post };
