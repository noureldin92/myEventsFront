import NewsletterSignup from "../components/newsletterSignup";
import Content from "../components/Content";

function NewsletterPage() {
  return (
    <Content title="Join our awesome newsletter!">
      <NewsletterSignup />
    </Content>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!" };
}
