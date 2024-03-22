interface Link {
  title: string;
  href: string;
}

interface Item {
  icon: string;
  content: string;
}

interface SocialLink {
  icon: string;
  href: string;
}

interface Footer {
  title: string;
  description: string;
  linksTitle: string;
  links: Link[];
  contactTitle: string;
  contactItems: Item[];
  address: Item;
  copyright: string;
  socialLinks: SocialLink[];
}

export default Footer;
