import PopupWithForm from "./PopupWithForm";

const SubmitPopup = props => {
    const { isOpen, onClose, onSubmitDelete, card, isLoading } = props;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmitDelete(card);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name="delete-card"
            title="Вы уверены?"
            onClose={onClose}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            buttonText={isLoading ? "Удаление..." : "Да"}
            isValid={true}
        >
        </PopupWithForm>
    );
}

export default SubmitPopup;