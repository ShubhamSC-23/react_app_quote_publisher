import { Link } from "react-router";

const Home = () => {
	return (
		<div className="min-vh-100 d-flex flex-column">

			{/* Navbar */}
			<nav className="navbar navbar-expand-lg bg-dark px-4">
				<div className="container-fluid">
					<Link className="navbar-brand text-warning fw-bold fst-italic" to="/">Inspiring Quotes</Link>
					<div className="collapse navbar-collapse justify-content-end">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link text-warning fw-bold" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link text-warning fw-bold" to="/about">About Us</Link>
							</li>
							<li className="nav-item">
								<Link className="btn btn-warning ms-3 fw-semibold" to="/signin">Sign In</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* Stripe 1 - Hero Section (Dark Gray) */}
			<section className="py-5 bg-dark bg-opacity-25 text-center">
				<div className="container">
					<h1 className="display-4 text-dark fw-bold">Welcome to Inspiring Quotes</h1>
					<p className="lead text-dark fw-semibold">Discover powerful thoughts and meaningful words from thinkers across time.</p>
					<Link className="btn btn-dark mt-3 text-warning" to="/quotes">Explore Quotes</Link>
				</div>
			</section>

			{/* Stripe 2 - Quote of the Day (Light Dark Gray) */}
			<section className="py-5 bg-dark bg-opacity-75 text-center">
				<div className="container">
					<h2 className="mb-4 text-warning">Quote of the Day</h2>
					<blockquote className="blockquote fs-5 fst-italic text-light">
						“Success is not final, failure is not fatal: It is the courage to continue that counts.”
						<footer className="blockquote-footer text-primary mt-2">Winston Churchill</footer>
					</blockquote>
				</div>
			</section>

			{/* Stripe 3 - Call to Action (Dark Black Gray) */}
			<section className="py-5 bg-dark bg-opacity-25 text-center">
				<div className="container">
					<h2 className="text-dark fw-semibold">Get Inspired Daily</h2>
					<p className="text-dark fw-semibold">Join our community and receive hand-picked quotes every day.</p>
					<Link className="btn btn-warning text-dark fw-bold mt-2" to="/signup">Sign Up Now</Link>
				</div>
			</section>

			{/* Stripe 4 - Footer (Dark Gray) */}
			<footer className="bg-dark text-center py-4 mt-auto text-light">
				<p className="mb-1">&copy; {new Date().getFullYear()} Inspiring Quotes. All rights reserved.</p>
				<div>
					<Link className="text-warning me-3 text-decoration-underline" to="/about">About</Link>
					<Link className="text-warning text-decoration-underline" to="/contact">Contact</Link>
				</div>
			</footer>
		</div>
	);
};

export default Home;
