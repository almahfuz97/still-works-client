import { Button, Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

export default function ReadBlogModal({ clicked, blog, handleClick }) {
    const [visible, setVisible] = useState();

    const descArray = blog.blog.split('+');
    console.log(clicked)

    useEffect(() => {
        setVisible(clicked);
    }, [clicked])
    return (
        <React.Fragment>
            <Modal
                show={visible}
                onClose={() => {
                    handleClick(false)
                    setVisible(false)
                }}
            >
                <Modal.Header>
                    {blog.title}
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 overflow-y-scroll max-h-[300px]">
                        {
                            descArray.map((para, index) => {
                                return (
                                    <div key={index * 10} >
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            {para}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => { }}>
                        I accept
                    </Button>
                    <Button
                        color="gray"
                        onClick={() => { }}
                    >
                        Decline
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </React.Fragment>
    )
}