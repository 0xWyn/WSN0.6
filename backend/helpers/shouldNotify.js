export const shouldNotify = (receiver, sender) => {
    return receiver && !sender.equals(receiver);
};
