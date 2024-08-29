import Link from '@docusaurus/Link';
import AutoScroll from 'embla-carousel-auto-scroll';

import {
  SectionDescription,
  SectionTitle,
} from '@site/src/components/ui/SectionWrapper';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@site/src/components/ui/Carousel';
import CompanyLogo from './CompanyLogo';
import styles from './styles.module.scss';

import companies from '@site/src/data/companies.json';

const filteredCompanies = companies.filter((company) => !!company.logo);
const logosListsDivider = 30;

export default function WhoUses() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle>Who Uses JHipster?</SectionTitle>

        <SectionDescription>
          Lots of great companies use JHipster, all over the world!{' '}
          <Link
            className="text-foreground underline"
            href="/companies-using-jhipster"
          >
            Find the full list here
          </Link>
          , and don't forget to add your company once you have started using
          JHipster
        </SectionDescription>
      </div>

      <Carousel
        className={styles.carousel}
        opts={{ align: 'center', loop: true }}
        plugins={[AutoScroll({ speed: 1, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {filteredCompanies.slice(0, logosListsDivider).map((company, idx) => (
            <CarouselItem key={`users-${idx}`} className={styles.carouselItem}>
              <CompanyLogo company={company} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        className={styles.carousel}
        opts={{ align: 'center', loop: true }}
        plugins={[AutoScroll({ speed: 0.75, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {filteredCompanies.slice(logosListsDivider).map((company, idx) => (
            <CarouselItem key={`users-${idx}`} className={styles.carouselItem}>
              <CompanyLogo company={company} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
