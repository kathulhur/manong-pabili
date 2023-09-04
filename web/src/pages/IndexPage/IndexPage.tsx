import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";
import Button from "src/components/Button/Button";

const IndexPage = () => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  useEffect(() => {
      if (isAuthenticated && currentUser) {
          if(currentUser.roles.includes('VENDOR')) {
              navigate(routes.home())
          }
      }
  }, [isAuthenticated, currentUser])

  // current user gets set to undefined on app start (yarn rw dev)
  //  but isAuthenticated is still true
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <MetaTags title="Index" description="Index page" />

      <div className='max-w-7xl mx-auto p-8'>
        <header className="flex items-center justify-between">
          <h1 className='font-extrabold text-lg text-green-700'>Manong Pabili</h1>
          <nav className="flex items-center justify-between gap-4">
            <Link to={routes.login()}>Login</Link>
            <Link to={routes.signup()}>
              <Button>
                Sign up
              </Button>
            </Link>
          </nav>
        </header>
      </div>

        <section className="w-full bg-green-400/25">
          <div className='max-w-7xl mx-auto px-8 pt-20 pb-32'>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Missed that taho<br/>vendor?</h2>
            <p className="text-slate-700 mb-4">Don't worry, manong could be<br/>nearby.</p>
            <Button>See moving vendors</Button>
          </div>
        </section>

        <div className='max-w-7xl mx-auto p-8'>
          <section className="flex flex-col gap-8 justify-between mb-8 lg:flex-row">
            <div className="max-w-md w-full h-72 bg-slate-400/25"></div>
            <div className="max-w-md">
              <h2 className="font-bold text-slate-900 text-xl mb-8">Show us your spot!</h2>
              <p className="text-slate-700 mb-4">Want to be part of our growing family of vendors?</p>
              <Button className="mb-8">Sign up as vendor</Button>
              <p className="text-slate-700 mb-4">Let people know where you are by sharing your location.</p>
              <Button variant="secondary">Login</Button>
            </div>
          </section>

          <h2 className="mt-16 mb-8 font-semibold text-slate-900 text-center text-2xl">App Features</h2>

          <section className="flex flex-col gap-8 items-center justify-between mt-8 mb-16 lg:flex-row">
            <div className="max-w-md">
              <h3 className="font-bold text-green-700 text-xl mb-4">Customers</h3>
              <p className="text-slate-700 mb-2">Empower consumers with the ability to see where the vendors are.</p>
            </div>
            <div className="max-w-md w-full h-72 bg-slate-400/25"></div>
          </section>

          <section className="flex flex-col-reverse gap-8 items-center justify-between mt-8 mb-16 lg:flex-row">
            <div className="max-w-md w-full h-72 bg-slate-400/25"></div>
            <div className="max-w-md">
              <h3 className="font-bold text-green-700 text-xl mb-4">Vendors</h3>
              <h4 className="font-semibold text-slate-900 mb-2">Share your location</h4>
              <p className="text-slate-700 mb-4">Provides visibility by allowing vendors to broadcast their location</p>

              <h4 className="font-semibold text-slate-900 mb-2">Let them know your products</h4>
              <p className="text-slate-700 mb-4">Share your location and let them know your products</p>

              <h4 className="font-semibold text-slate-900 mb-2">Not moving? Switch to manual</h4>
              <p className="text-slate-700 mb-4">Vendors can static, manual, or realtime made to fit their situation</p>
            </div>
          </section>


        </div>
    </>
  );
};

export default IndexPage;
