import PopupWithForm from "./PopupWithForm";

const SubmitPopup = props => {
    const { isOpen, onClose, onSubmitDelete, card } = props;

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
            onSubmit={handleSubmit}
            buttonText="Да"
        >
        </PopupWithForm>
    );
}

export default SubmitPopup;