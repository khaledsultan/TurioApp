import Link from "next/link.js";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWR from "swr";
import { redirect } from "next/dist/server/api-utils/index.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/places");

  async function addPlace(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const locationData = Object.fromEntries(formData);

    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
    });
    if (!response.ok) {
      console.error(response.status);
      return;
    } else if (response.ok) {
      await response.json();
      router.push("/");
    }
    mutate();
    event.target.reset();
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
