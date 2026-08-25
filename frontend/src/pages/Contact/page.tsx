import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        if (errors[e.target.name as keyof typeof errors]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors = { name: "", email: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            toast.error("Please fill in the required fields correctly.");
            return;
        }
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="w-full">
                <BannerCard
                    title="Contact"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Contact" },
                    ]}
                />

            <Container className="py-16 px-4 md:px-0">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">Get In Touch With Us</h2>
                    <p className="text-gray-500 text-sm">
                        For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="flex flex-col gap-8 justify-center px-4">
                        <div className="flex items-start gap-4">
                            <img src="../../../public/Icons/loc.svg" alt="Location" className="w-6 h-6" />
                            <div>
                                <h3 className="font-medium text-lg">Address</h3>
                                <p className="text-sm text-gray-600">236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img src="../../../public/Icons/phone.svg" alt="Phone" className="w-6 h-6" />
                            <div>
                                <h3 className="font-medium text-lg">Phone</h3>
                                <p className="text-sm text-gray-600">Mobile: +(84) 546-6789</p>
                                <p className="text-sm text-gray-600">Hotline: +(84) 456-6789</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img src="../../../public/Icons/timer.svg" alt="Working Time" className="w-6 h-6" />
                            <div>
                                <h3 className="font-medium text-lg">Working Time</h3>
                                <p className="text-sm text-gray-600">Monday-Friday: 9:00 - 22:00</p>
                                <p className="text-sm text-gray-600">Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-6 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium mb-2">Your name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className={`w-full border rounded-lg p-3 text-sm outline-none ${
                                    errors.name ? "border-red-500" : "border-gray-300 focus:border-black"
                                }`}
                            />
                            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="YourEmail@example.com"
                                className={`w-full border rounded-lg p-3 text-sm outline-none ${
                                    errors.email ? "border-red-500" : "border-gray-300 focus:border-black"
                                }`}
                            />
                            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Your subject"
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Hi! i'd like to ask about..."
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-black resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#B88E2F] text-white font-medium py-3 px-8 rounded-md w-max hover:opacity-95 transition-opacity"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Contact;