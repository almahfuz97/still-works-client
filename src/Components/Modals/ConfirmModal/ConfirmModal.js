import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import exclamation from '../../../assets/explamation.png'

export default function ConfirmModal({ clicked, confirm, id }) {
    const [visible, setVisible] = useState(clicked);
    const [proceed, setProceed] = useState(false);
    return (
        <div>
            {/* <Button onClick={() => { }}>
                Toggle modal
            </Button> */}
            <Modal
                show={visible}
                size="md"
                popup={true}
                onClose={() => {
                    confirm(false, id)
                    setVisible(false)
                }
                }
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <img src={exclamation} className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    confirm(true, id)
                                    setVisible(false)
                                    setProceed(true)
                                }}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => {
                                    confirm(false)
                                    setVisible(false)
                                    setProceed(false)
                                }}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
