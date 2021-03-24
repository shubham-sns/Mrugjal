import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  updateUserFollowersField,
  updateUserFollowingField,
} from 'services/firebase';
import { useQueryClient } from 'react-query';

function SuggestedProfile({ suggestedUser, currentUserId }) {
  const [isUserFollowed, setIsUserFollowed] = useState(false);
  const queryClient = useQueryClient();

  async function handleFollowUserAction() {
    setIsUserFollowed(true);

    await updateUserFollowingField(suggestedUser.userId, currentUserId, false);
    await updateUserFollowersField(suggestedUser.docId, currentUserId, false);

    queryClient.invalidateQueries(['user']);
  }

  const isSuggestedUserFollower = suggestedUser.following.includes(
    currentUserId,
  );

  if (isUserFollowed) return null;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <Link to={`/u/${suggestedUser.username}`}>
          <img
            className="rounded-full w-8 flex mr-3"
            src={suggestedUser.photoURL}
            alt=""
          />
        </Link>
        <div>
          <Link
            to={`/p/${suggestedUser.username}`}
            className="hover:underline flex"
          >
            <p className="font-semibold text-sm mb-0.5 max-w-max">
              {suggestedUser.username}
            </p>
            {suggestedUser.verifiedUser && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 mt-0.5 ml-0.5 opacity-90 text-blue-medium"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Link>
          <p className="text-xs text-gray-500">
            {isSuggestedUserFollower ? 'Follows you' : 'Suggested for you'}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Follow ${suggestedUser.username} profile`}
        className="text-sm font-bold text-blue-medium py-1 px-2"
        onClick={handleFollowUserAction}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleFollowUserAction();
        }}
      >
        Follow
      </button>
    </div>
  );
}

SuggestedProfile.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  suggestedUser: PropTypes.shape({
    username: PropTypes.string,
    docId: PropTypes.string,
    userId: PropTypes.string,
    // photoURL: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    verifiedUser: PropTypes.bool,
  }).isRequired,
};

export { SuggestedProfile };
