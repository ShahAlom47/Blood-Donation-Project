

const ContactSection = () => {
    return (
        <div className=" bg-color-p">
            <div className="max-w lg:flex items-center gap-20 px-6 py-10">
                <div className=" text-white">
                    <h1 className="lg:text-5xl md:text-4xl text-3xl mb-8 font-bold ">Let`s change the world, Join us now!</h1>
                    <p className="mb-6 font-medium pr-5">Every drop of blood counts. Join our mission to save lives and make a difference. Your contribution can help those in need and bring hope to countless individuals. Be a hero today by becoming a blood donor.</p>
                </div>
                <div>
                    <button style={{backgroundColor:'white',  }} className="btn-p btn-text-color font-bold  hover:text-white">Contact Us</button>
                </div>
            </div>
            
        </div>
    );
};

export default ContactSection;