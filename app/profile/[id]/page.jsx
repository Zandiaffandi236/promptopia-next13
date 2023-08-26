"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const fetchPost = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`);
    const data = await response.json();

    console.log(data);

    setPosts(data);
  };

  useEffect(() => {
    fetchPost();
    console.log(params.id);
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exeptional prompts and be inspired by the power of their imagination `}
      data={posts}
    />
  );
};

export default UserProfile;
