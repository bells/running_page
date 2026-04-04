interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === '/' ? '' : baseUrl;
};

const data: ISiteMetadataResult = {
  siteTitle: 'Watson Running Page',
  siteUrl: 'https://run.watsonzhu.cn/',
  logo: `${getBasePath()}/images/logo.png`,
  description: 'Personal site and blog',
  navLinks: [
    {
      name: 'Summary',
      url: `${getBasePath()}/summary`,
    },
    {
      name: 'Blog',
      url: 'https://bells.github.io/',
    },
    {
      name: 'About',
      url: 'https://github.com/bells/running_page',
    },
  ],
};

export default data;
