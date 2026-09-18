import Notification from "../models/notificationModel.js";

export const clanNotificationService = async (type, clan, receiver, rank) => {
    return Notification.create({
        type,
        entity: clan._id,
        entityModel: "Clan",
        receiver,
        metadata: { clanName: clan.name, clanAvatar: clan.avatar.url, rank },
    });
};

// Different kind of notifications

// Follow
// New follow from follower.username
// Clans
// New membership
// You request to clan.name has been approved. You now have full access to clan.name;

// Invitations
// You have been invited to join clan.name

// Promotion
// You have been promoted to the rank of clan.role leader in clan.name Your permissions now includes getPermissions(role)
// Demotion
// You have been demoted to the rank of clan.role. See query for details.
// Warning
// You have been flagged in clan.name for rules that violate clan rules
// Suspension
// You have been suspended from clan.name

// Posts
// Like
// Your post has been liked by user.name;
// Comment
// New comment from user.name
// Share
// New share (no user info)?
// Comments
