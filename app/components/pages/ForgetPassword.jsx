import React, { Fragment } from 'react';
import IndexHeader from '../commons/IndexHeader';
import Footer from '../commons/Footer';

const ForgetPassword = () => (
  <Fragment>
    <div className="flex-col wrapper">
      <IndexHeader />
      <main className="mt-5 pt-5 flex-2">
        <div className="flex-row flex-center">
          <section className="px-3 py-3">
            <form>
              <div>
                <input
                  name="email"
                  placeholder="Email"
                  className="form-item pl-0"
                />
              </div>
              <div>
                <button type="submit" className="button button-primary">
                  {'Reset Password'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  </Fragment>
);

export default ForgetPassword;
