import Modal from "./Modal";
import React from "react";

const FeedbackModal = ({isModalOpen, setModalOpen, toggleModal, submit}) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const comment = event.target.elements.comment.value;
        const reward = event.target.elements.reward.value;
        await submit(reward, comment);
        setModalOpen(false);
    }

    return (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="font-semibold text-sm mb-6">COMPLETE FEEDBACK</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[15rem]">
                <div className="flex flex-col w-full gap-1 text-xs text-task-lighter">
                    <label htmlFor="comment" className="font-semibold">COMMENT</label>
                    <textarea id="comment" name="comment" className="bg-secondary-bg-color p-3 outline-none text-white rounded" />
                </div>
                <div className="flex flex-col w-full gap-1 text-xs text-task-lighter">
                    <label htmlFor="reward" className="text-xs text-task-lighter font-semibold">
                        REWARD (MC)
                    </label>
                    <input type="number" name="reward" id="reward" className="bg-secondary-bg-color p-3 outline-none text-white rounded"/>
                </div>
                <div className="flex gap-2 text-xs font-semibold">
                    <button
                        type="button"
                        onClick={toggleModal}
                        className="bg-secondary-bg-color text-task-lighter px-5 py-3 rounded hover:bg-red-500 hover:text-white"
                    >
                        CLOSE
                    </button>
                    <button
                        type="submit"
                        className="bg-emerald-450 px-5 py-3 flex-1 rounded"
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default FeedbackModal;
