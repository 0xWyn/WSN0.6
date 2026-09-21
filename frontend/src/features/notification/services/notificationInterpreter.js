export const notificationInterpreter = (notification) => {
    const { metadata, type, entityModel, entity } = notification;

    if (entityModel === "Clan") {
        const source = `/c/${entity}`;
        const entityAvatar = metadata.clanAvatar;
        const clanName = metadata.clanName;

        let msg = "";

        if (type === "clan_membership_approval") {
            msg = `You are now a member of ${clanName}!`;
        }

        if (type === "clan_promotion") {
            msg = `New rank: Leader!`;
        }

        if (type === "clan_demotion") {
            msg = `You have been demoted. New rank: Member!`;
        }

        const data = { msg, entityAvatar, type, source };

        return data;
    }
};
