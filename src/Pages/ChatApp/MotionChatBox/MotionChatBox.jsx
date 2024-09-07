/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import './MotionChatBox.css'
import { RxCross2 } from "react-icons/rx";


const MotionChatBox = ({ children, openChatBox, setOpenChatBox }) => {

    const boxVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            }
        },
        closed: {
            opacity: 0,
            y: "100%",
            transition: {
                duration: 0.5,
            }
        }
    }
    return (
        <div>

            <motion.div
                className="chat-box  rounded-sm bg-slate-100 "
                initial={false}
                animate={openChatBox ? "open" : "closed"}
                variants={boxVariants}
            >
                <div className="chat-header bg-color-p px-4 py-2 text-white rounded-t-xl text-lg font-bold">
                    <h3 >Chat with us!</h3>
                    <button className='bg-white rounded-full p-1 hover:bg-gray-200 text-color-p text-xl' onClick={() => setOpenChatBox(false)}><RxCross2 /></button>
                </div>
                {
                    children
                }
            </motion.div>
        </div>
    );
};

export default MotionChatBox;