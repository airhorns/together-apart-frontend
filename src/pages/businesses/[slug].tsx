import React from "react";
import NotFoundPage from "../404";
import { Hit } from "react-instantsearch-core";
import { Layout } from "../../components/layout/Layout";
import { Meta } from "../../components/Meta";
import { GetStaticProps, GetStaticPaths } from "next";
import { $backend } from "../../lib/backend";
import { StaticBusinessCard } from "../../components/search/BusinessCard/StaticBusinessCard";
import { assert, webflowToImgixURL } from "../../lib/utils";
import { BusinessDoc } from "../../components/search/BusinessDoc";

interface BusinessPageProps {
  business?: Hit<BusinessDoc>;
}

export default (props: BusinessPageProps) => {
  if (!props.business) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Meta title={`${props.business.name} is open during COVID-19`} ogImage={webflowToImgixURL(props.business.header_image)} />
      <StaticBusinessCard hit={props.business} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BusinessPageProps, { slug: string }> = async (context) => {
  await $backend.prepare();
  const searchResponse = await $backend.$index.search<Hit<BusinessDoc>>("", { filters: `slug:"${assert(context.params).slug}"` });

  return {
    props: { business: searchResponse.hits[0] },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await $backend.prepare();
  const paths: { params: Record<string, string> }[] = [];

  await $backend.paginatedItems(async (page) => {
    page.items.filter($backend.readyForPublish).forEach((item) => {
      paths.push({ params: { slug: item.slug } });
    });
  });

  console.log("prepared static paths", { length: paths.length });

  return {
    paths: paths,
    fallback: true,
  };
};
