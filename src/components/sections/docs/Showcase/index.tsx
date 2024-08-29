import ContentMediaCard from '@site/src/components/ContentMediaCard';
import styles from './styles.module.scss';

export default function Showcase() {
  return (
    <div className={styles.sectionList}>
      <ContentMediaCard
        title="Devoxx"
        href="https://devoxx.com/"
        image="/images/showcase/beta.devoxx.com.png"
      />

      <ContentMediaCard
        title="Hatequeue"
        href="https://www.hatequeue.com"
        image="/images/showcase/hatequeue.png"
      >
        <p>
          Created by: <a href="http://www.djavafactory.com">DJava Factory</a>
        </p>
      </ContentMediaCard>

      <ContentMediaCard
        title="OncoKB"
        href="https://www.oncokb.org"
        image="/images/showcase/oncokb.org.png"
      >
        <p>Precision Oncology Knowledge Base</p>
      </ContentMediaCard>

      <ContentMediaCard
        title="SoundXtream Audio Platform"
        href="https://github.com/xavierpandis/soundxtreamRS"
        video="4K5hP7sgJPA"
      >
        <p>
          Created by:{' '}
          <a href="http://www.linkedin.com/in/xavierpandisgarcia">
            Xavier Pandis Garcia
          </a>
        </p>
        <p>
          Project Director:{' '}
          <a href="http://www.linkedin.com/in/alfredorueda">
            Alfredo Rueda Unsain
          </a>
        </p>
      </ContentMediaCard>

      <ContentMediaCard
        title="Klask.io"
        href="http://app.klask.io/#/"
        image="/images/showcase/app.klask.io.png"
      />

      <ContentMediaCard
        title="21-Points Health"
        href="http://www.21-points.com/#/"
        image="/images/showcase/www.21-points.com.png"
      />

      <ContentMediaCard
        title="Blue Magic Cat"
        href="http://bluemagiccat.com/"
        image="/images/showcase/bluemagiccat.com.png"
      />

      <ContentMediaCard
        title="The Rock Bible"
        href="https://github.com/jotabono/rockallum"
        video="KqcRdAhlTfc"
      >
        <p>
          Created by: <a href="http://www.javierbono.com">Javier Bono</a>
        </p>
      </ContentMediaCard>

      <ContentMediaCard
        title="Real State Camp"
        href="https://github.com/arnaugarcia/assessoriatorrelles"
        video="NxtQF0E4T0A"
      >
        <p>
          Created by: <a href="http://arnaugarcia.com">Arnau García Gallego</a>{' '}
          and <a href="https://alfdocimo.github.io/">Alfredo Narvaez Docimo</a>
        </p>
        <p>
          Project Director:{' '}
          <a href="http://www.linkedin.com/in/alfredorueda">
            Alfredo Rueda Unsain
          </a>
        </p>
      </ContentMediaCard>

      <ContentMediaCard
        title="Motorsports Database"
        href="https://www.motorsports-database.racing"
        image="/images/showcase/motorsports-database.racing.png"
      />

      <ContentMediaCard
        title="Collaborative Open Source CMS: Spingular"
        href="http://www.spingular.com"
        image="https://www.jhipster.tech/images/showcase/jhipsterpress.png"
      />

      {/* <ContentMediaCard
        title="MyVindex - Video Edtech CMS with an interactive table of contents"
        href="https://www.myvindex.com"
        video="_eUutvqChcc"
      /> */}

      <ContentMediaCard
        title="Bon Limousin"
        href="https://limousin.se"
        image="/images/showcase/limousin.se.png"
      >
        <p>
          Source code:{' '}
          <a href="https://github.com/frostmarked/bonParent">GitHub</a>
        </p>
        <p>
          Description: Example of microservices architecture, with some tweaks.
        </p>
      </ContentMediaCard>

      <ContentMediaCard
        title="InfinityShopping"
        href="https://www.infinityshopping.online"
        video="YYEodtIGeZQ"
      >
        <p>
          Source code:{' '}
          <a href="https://github.com/PiotrZielonka/infinityshopping/tree/develop">
            GitHub
          </a>
        </p>
        <p>Description: The e-commerce shops generator</p>
      </ContentMediaCard>
    </div>
  );
}
