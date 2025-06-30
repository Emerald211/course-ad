import React, { useState } from 'react';
import {
	Play,
	CheckCircle,
	Star,
	Users,
	X,
	AlertTriangle,
	TrendingUp,
	
	Shield,
	Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Benefit {
	text: string;
	isPositive: boolean;
}

interface CourseFeature {
	title: string;
	description: string;
}

interface Bonus {
	title: string;
	description: string;
}

const Home: React.FC = () => {
	const [showVideo, setShowVideo] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};

	const benefits: Benefit[] = [
		{
			text: 'Traditional farming is expensive (feeds, maintenance, space)',
			isPositive: false,
		},
		{ text: 'Takes too long to see profits', isPositive: false },
		{ text: 'Fish farming seems too complicated', isPositive: false },
	];

	const courseFeatures: CourseFeature[] = [
		{
			title: 'Less space required',
			description: 'Start in your backyard or even with Buckets!',
		},
		{
			title: 'Very low feeding costs',
			description: 'Save 80% Compared to Farming Table-Size',
		},
		{
			title: 'High Demand from Local Fish Farmers',
			description: 'Customers are already waiting & ready to Buy!',
		},
		{
			title: 'Faster Profit Turnover',
			description: 'Hatch, Raise & Sell in 4-8 weeks',
		},
	];

	const bonuses: Bonus[] = [
		{
			title: 'Less space required',
			description: 'Start in your backyard or even with Buckets!',
		},
		{
			title: 'Very low feeding costs',
			description: 'Save 80% Compared to Farming Table-Size',
		},
		{
			title: 'High Demand from Local Fish Farmers',
			description: 'Customers are already waiting & ready to Buy!',
		},
		{
			title: 'Faster Profit Turnover',
			description: 'Hatch, Raise & Sell in 4-8 weeks',
		},
	];

	const handleVideoClick = (): void => {
		setShowVideo(true);
	};

	const handleCloseVideo = (): void => {
		setShowVideo(false);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};
	const handlePaystackCheckout = (): void => {
		setIsLoading(true);

		// Initialize Paystack payment
		const handler = window.PaystackPop.setup({
			key: paystackPublicKey,
			email: email || 'customer@example.com',
			amount: 200000,
			currency: 'NGN',
			ref: 'catfish_course_' + Math.floor(Math.random() * 1000000000 + 1),
			metadata: {
				custom_fields: [
					{
						display_name: 'Course Name',
						variable_name: 'course_name',
						value: 'Catfish Breeding Masterclass',
					},
				],
			},
			callback: function (response: PaystackResponse) {
				console.log('Payment successful:', response);
				setIsLoading(false);
				navigate('/access-course');
			},
			onClose: function () {
				console.log('Payment popup closed');
				setIsLoading(false);
			},
		});

		handler.openIframe();
	};

	const handleSecureSpot = (): void => {
		// Check if email is provided
		if (!email) {
			alert('Please enter your email address first');
			return;
		}

		// Check if Paystack is loaded
		if (typeof window.PaystackPop === 'undefined') {
			alert('Payment system is loading. Please try again in a moment.');
			return;
		}

		handlePaystackCheckout();
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900'>
			{/* Video Modal */}
			{showVideo && (
				<div className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4'>
					<div className='relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl'>
						<button
							onClick={handleCloseVideo}
							className='absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors'
							aria-label='Close video'>
							<X size={20} className='text-white' />
						</button>
						<iframe
							className='w-full h-full'
							src='https://www.youtube.com/embed/Fwqw5mST9OY?si=DbcQcsEX3RVIZg3j'
							title='Catfish Farming Video'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen></iframe>
					</div>
				</div>
			)}

			{/* Header */}
			<div className='container mx-auto px-4 py-12 max-w-4xl'>
				{/* Urgency Badge */}
				<div className='text-center mb-8'>
					<div className='inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg'>
						<AlertTriangle className='w-4 h-4 mr-2' />
						LIMITED TIME: Only 25 Spots Remaining
					</div>
				</div>

				{/* Main Headline */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
						How I Made <span className='text-green-600'>₦1.2 Million</span>
						<br />
						From Just <span className='text-blue-600'>2 Catfish</span>
					</h1>

					<div className='bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg mb-8 shadow-sm'>
						<p className='text-xl md:text-2xl font-semibold text-gray-800'>
							Learn the simple catfish hatching system that generates ₦380,000
							every 2 months
						</p>
					</div>
				</div>

				{/* Video Section */}
				<div className='mb-12'>
					<div
						className='relative aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-pointer group shadow-xl border-2 border-red-500 hover:border-green-500 transition-colors'
						onClick={handleVideoClick}>
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 flex items-center justify-center'>
							<div className='text-center'>
								<div className='bg-red-600 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl'>
									<Play size={32} className='ml-1 text-white' />
								</div>
								<h3 className='text-2xl font-bold mb-2 text-white'>
									Watch: The Secret Catfish Method For Free
								</h3>
								<p className='text-lg text-gray-200'>
									See exactly how this system works
								</p>
							</div>
						</div>
						<div className='absolute bottom-4 left-4 bg-black bg-opacity-75 px-3 py-1 rounded-full text-white text-sm'>
							<Users className='inline w-4 h-4 mr-1' />
							2,847 watching
						</div>
					</div>
				</div>

				{/* CTA Button */}
				<div className='text-center mb-16'>
					<button
						onClick={scrollToBottom}
						className='bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-4 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300'>
						Get Instant Access - ₦2,000
					</button>
					<p className='text-gray-600 mt-3'>👆 Secure your spot now</p>
				</div>

				{/* Profit Breakdown */}
				<div className='mb-16'>
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-200'>
					<h2 className='text-3xl font-bold text-green-500 text-center mb-2'>
								Let me tell you a story...
							</h2>
						<div className='bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6'>
							
							
						
							<p className='text-lg mb-4 text-gray-700'>
								I'm not a big farmer. I don't own a large fish pond or any fancy
								equipment.
							</p>
							<p className='text-lg mb-4 text-blue-600 font-bold'>
								However, in 2023
							</p>
							<p className='text-lg mb-4 text-gray-700'>
								I discovered a{' '}
								<span className='text-green-600 font-bold'>SIMPLE PROCESS</span>{' '}
								that puts an extra ₦380,000 in my wallet every two months.
							</p>
							<p className='text-xl font-bold text-green-600'>
								Total: ₦1.52 million every year! 💰
							</p>
							<p className='text-lg mt-2 mb-4 text-gray-700'>
								In the past two years, I have made over
								<span className='text-xl ml-1 font-bold text-green-600'>
									₦3.04 million
								</span>{' '}
								by repeating this simple process.
							</p>
						</div>

						<div className='text-center mb-8'>
							<TrendingUp className='w-12 h-12 text-green-600 mx-auto mb-4' />
							<h2 className='text-3xl font-bold text-green-500 mb-2'>
							Here's exactly how the numbers work
							</h2>
							
						</div>

					

						<div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
							<h3 className='text-xl font-bold mb-4 text-gray-800'>
								The Simple Process:
							</h3>
							<div className='space-y-4'>
								<div className='flex items-center space-x-3'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>1</span>
									</div>
									<p>
										<strong>Investment:</strong> ₦70,000 for 2 mature catfish +
										basic setup
									</p>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>2</span>
									</div>
									<p>
										<strong>Result:</strong> 20,000 baby catfish after breeding
										cycle
									</p>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='bg-green-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>3</span>
									</div>
									<p>
										<strong>Sales:</strong> ₦30 per catfish after 4 months
										growth
									</p>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='bg-yellow-600 rounded-full w-8 h-8 flex items-center justify-center'>
										<span className='text-white font-bold'>💰</span>
									</div>
									<p className='text-xl font-bold text-green-600'>
										PROFIT: ₦530,000 per cycle!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Problem/Solution */}
				<div className='mb-16'>
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-200'>
						<h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>
							Why Traditional Fish Farming Fails
						</h2>

						<div className='grid md:grid-cols-2 gap-8 mb-8'>
							<div>
								<h3 className='text-xl font-bold mb-4 text-red-600'>
									❌ Old Way Problems:
								</h3>
								<div className='space-y-3'>
									{benefits.map((benefit: Benefit, index: number) => (
										<div
											key={index}
											className='flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200'>
											<X className='w-5 h-5 text-red-500 mt-0.5' />
											<span className='text-gray-700'>{benefit.text}</span>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className='text-xl font-bold mb-4 text-green-600'>
									✅ Our Solution:
								</h3>
								<div className='space-y-3'>
									{courseFeatures.map(
										(feature: CourseFeature, index: number) => (
											<div
												key={index}
												className='p-3 bg-green-50 rounded-lg border border-green-200'>
												<div className='flex items-start space-x-3'>
													<CheckCircle className='w-5 h-5 text-green-500 mt-0.5' />
													<div>
														<span className='font-semibold text-gray-800'>
															{feature.title}
														</span>
														<p className='text-sm text-gray-600'>
															{feature.description}
														</p>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Course Content */}
				<div className='mb-16'>
					<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-200'>
						<div className='text-center mb-8'>
							<h2 className='text-3xl font-bold text-gray-800 mb-4'>
								What You Get for ₦2,000
							</h2>
							<p className='text-xl text-gray-600'>
								Complete training system + lifetime access
							</p>
						</div>

						<div className='grid md:grid-cols-2 gap-4 mb-8'>
							{bonuses.map((bonus: Bonus, index: number) => (
								<div
									key={index}
									className='flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200'>
									<Star className='w-5 h-5 text-blue-600 mt-0.5' />
									<div>
										<h4 className='font-semibold text-gray-800'>
											{bonus.title}
										</h4>
										<p className='text-sm text-gray-600'>{bonus.description}</p>
									</div>
								</div>
							))}
						</div>

						<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center'>
							<p className='text-lg font-semibold text-gray-800 mb-2'>
								📺 Complete Video Training System
							</p>
							<p className='text-gray-600'>
								Not just PDFs - watch me do it step by step
							</p>
						</div>
					</div>
				</div>

				{/* Guarantee */}
				<div className='mb-16'>
					<div className='bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-lg'>
						<Shield className='w-16 h-16 text-green-600 mx-auto mb-4' />
						<h3 className='text-2xl font-bold mb-4 text-green-800'>
							100% Money-Back Guarantee
						</h3>
						<p className='text-lg mb-4 text-gray-700'>
							If you don't make your first ₦50,000 within 6 months...
						</p>
						<p className='text-xl font-bold text-green-600'>
							I'll refund every penny! 
						</p>
					</div>
				</div>

				{/* Final CTA Section */}
				<div className='bg-white rounded-xl shadow-lg p-8 border-2 border-red-200'>
					<div className='text-center mb-8'>
						<div className='flex items-center justify-center mb-4'>
							<Clock className='w-8 h-8 text-red-600 mr-2' />
							<h3 className='text-2xl font-bold text-red-600'>
								Limited Time Offer
							</h3>
						</div>
						<div className='space-y-2 mb-6'>
							<p className='text-lg text-gray-700'>
								🔥 Only 25 spots available
							</p>
							<p className='text-lg text-gray-700'>
								⏰ Price increases at midnight
							</p>
							<p className='text-lg text-gray-700'>
								🚫 Then access closes forever
							</p>
						</div>
					</div>

					{/* Email Input */}
					<div className='max-w-md mx-auto mb-6'>
						<div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
							<h4 className='text-lg font-semibold mb-3 text-gray-800'>
								Enter Your Email first:
							</h4>
							<input
								type='email'
								value={email}
								onChange={handleEmailChange}
								placeholder='your.email@example.com'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
								required
							/>
							<p className='text-sm text-gray-500 mt-2'>
								Secure checkout - your email is protected
							</p>
						</div>
					</div>

					{/* Final CTA Button */}
					<div className='text-center'>
						<button
							onClick={handleSecureSpot}
							disabled={isLoading || !email}
							className='bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl py-4 px-8 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300'>
							{isLoading ? '⏳ Processing...' : '🔒 Secure My Spot - ₦2,000'}
						</button>

						{!email && (
							<p className='text-red-600 mt-3'>
								⚠️ Please enter your email address above
							</p>
						)}

						<p className='text-gray-500 text-sm mt-4'>
							One-time payment • Lifetime access • 100% guarantee
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
