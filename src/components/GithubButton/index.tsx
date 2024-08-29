import { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { FaGithub } from 'react-icons/fa6';

type Props = {
  children: ReactNode;
};

export default function GithubButton({ children }: Props) {
  return (
    <Link
      className="button button--secondary"
      href="https://github.com/jhipster/generator-jhipster"
    >
      <FaGithub />
      <span>{children}</span>
    </Link>
  );
}
