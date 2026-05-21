import HeartIcon from "../../../components/icons/heartII";

export default function LikeButton({ handleLike, isLiked }) {
    return (
        <button className="!p-0 transition-all duration-200 hover:scale-110 active:scale-95">
            <HeartIcon isLiked={isLiked} />
        </button>
    );
}
