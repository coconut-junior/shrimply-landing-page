export function Popup() {
  return (
    <form
      action="https://app.kit.com/forms/5693365/subscriptions"
      className="seva-form formkit-form"
      method="post"
      data-sv-form={5693365}
      data-uid="04e00b1c2d"
      data-format="inline"
      data-version={5}
      data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
      min-width="400 500 600 700 800"
      style={{ backgroundColor: 'rgb(250, 252, 255)', borderRadius: 10 }}
    >
      <div className="formkit-background" style={{ opacity: '0.2' }} />
      <div data-style="minimal">
        <div
          className="formkit-header"
          data-element="header"
          style={{ color: 'rgb(49, 42, 42)', fontSize: 27, fontWeight: 700 }}
        >
          <h2>
            🎁 Get Free Custom <br></br>Building Instructions!
          </h2>
        </div>
        <div
          className="formkit-subheader"
          data-element="subheader"
          style={{ color: 'rgb(49, 42, 42)', fontSize: 18 }}
        >
          <p>
            Unlock exclusive LEGO building guides delivered straight to your
            inbox. Perfect for both beginners and master builders!
          </p>
        </div>
        <ul
          className="formkit-alert formkit-alert-error"
          data-element="errors"
          data-group="alert"
        />
        <div
          data-element="fields"
          data-stacked="false"
          className="seva-fields formkit-fields"
        >
          <div className="formkit-field">
            <input
              className="formkit-input"
              name="email_address"
              aria-label="Email Address"
              placeholder="Email Address"
              required={true}
              type="email"
              style={{
                borderColor: 'rgb(49, 42, 42)',
                color: 'rgb(49, 42, 42)',
                borderRadius: 4,
                fontWeight: 400,
              }}
            />
          </div>
          <div className="formkit-spinner" />
          <button
            data-element="submit"
            className="formkit-submit formkit-submit"
            style={{
              backgroundColor: 'rgb(51, 67, 210)',
              color: 'rgb(255, 255, 255)',
              borderRadius: 4,
              fontWeight: 400,
            }}
          >
            <span className="">Subscribe</span>
          </button>
        </div>
        <div
          className="formkit-guarantee"
          data-element="guarantee"
          style={{ color: 'rgb(49, 42, 42)', fontSize: 13, fontWeight: 400 }}
        >
          <p>We won't send you spam. Unsubscribe at any time.</p>
        </div>
        <div className="formkit-powered-by-convertkit-container">
          <a
            href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
            data-element="powered-by"
            className="formkit-powered-by-convertkit"
            data-variant="dark"
            target="_blank"
            rel="nofollow"
          >
            Built with Kit
          </a>
        </div>
      </div>
    </form>
  );
}
