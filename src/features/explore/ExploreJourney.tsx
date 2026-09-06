"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { exploreStages } from "./explore.config";
import styles from "./ExploreJourney.module.css";

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function ExploreJourney() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopMode, setDesktopMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);

    const sync = () => {
      setDesktopMode(desktop.matches);
      setReducedMotion(reduced.matches);
    };

    sync();
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  const immersive = desktopMode && !reducedMotion;

  useEffect(() => {
    if (!immersive) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollable = Math.max(wrapper.offsetHeight - window.innerHeight, 1);
      const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = travelled / scrollable;
      const nextIndex = Math.min(
        exploreStages.length - 1,
        Math.floor(progress * exploreStages.length),
      );
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [immersive]);

  const scrollToStage = useCallback(
    (index: number, updateHash = true) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const stage = exploreStages[index];
      if (updateHash) {
        window.history.replaceState(null, "", `#explore-${stage.slug}`);
      }

      if (!immersive) {
        document.getElementById(`explore-${stage.slug}`)?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      const wrapperTop = window.scrollY + wrapper.getBoundingClientRect().top;
      const scrollable = Math.max(wrapper.offsetHeight - window.innerHeight, 1);
      const target = wrapperTop + scrollable * ((index + 0.08) / exploreStages.length);
      window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [immersive, reducedMotion],
  );

  useEffect(() => {
    if (!immersive) return;
    const followHash = () => {
      const hash = window.location.hash.replace("#explore-", "");
      const index = exploreStages.findIndex((stage) => stage.slug === hash);
      if (index >= 0) scrollToStage(index, false);
    };

    const timer = window.setTimeout(followHash, 80);
    window.addEventListener("hashchange", followHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", followHash);
    };
  }, [immersive, scrollToStage]);

  return (
    <section className={styles.section} aria-labelledby="explore-heading">
      <Container className={styles.introWrap}>
        <div className={styles.introIndex} aria-hidden="true">02</div>
        <div>
          <p className={styles.eyebrow}>Explore EOE</p>
          <h2 id="explore-heading">Follow the questions.</h2>
          <p className={styles.intro}>
            Six questions offer a path into some of the central themes explored in <em>Evolution of Energy</em>.
          </p>
        </div>
      </Container>

      {immersive ? (
        <div ref={wrapperRef} className={styles.immersiveWrapper}>
          <div className={styles.stickyFrame}>
            <div className={styles.sceneStack} aria-hidden="true">
              {exploreStages.map((stage, index) => (
                <div
                  key={stage.slug}
                  className={`${styles.scene} ${styles[stage.tone]} ${index === activeIndex ? styles.sceneActive : ""}`}
                >
                  <span className={styles.orb} />
                  <span className={styles.ridgeFar} />
                  <span className={styles.ridgeNear} />
                  <span className={styles.trace} />
                  {stage.slug === "participation" ? <span className={styles.figure} /> : null}
                </div>
              ))}
            </div>

            <Container className={styles.frameGrid}>
              <div className={styles.copyStack} aria-live="polite">
                {exploreStages.map((stage, index) => (
                  <article
                    key={stage.slug}
                    id={`explore-${stage.slug}`}
                    className={`${styles.stageCopy} ${index === activeIndex ? styles.copyActive : ""}`}
                    aria-hidden={index !== activeIndex}
                  >
                    <p className={styles.stageCount}>{stage.num} <span>/ 06</span></p>
                    <p className={styles.stageTitle}>{stage.title}</p>
                    <h3>{stage.question}</h3>
                    <p className={styles.support}>{stage.support}</p>
                    <Link href={stage.href} className={styles.stageLink} tabIndex={index === activeIndex ? 0 : -1}>
                      Explore this idea <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>

              <nav className={styles.progressNav} aria-label="Explore EOE stages">
                <div className={styles.progressLine} aria-hidden="true">
                  <span style={{ transform: `scaleX(${activeIndex / (exploreStages.length - 1)})` }} />
                </div>
                <ol>
                  {exploreStages.map((stage, index) => (
                    <li key={stage.slug}>
                      <button
                        type="button"
                        className={index === activeIndex ? styles.progressActive : ""}
                        aria-current={index === activeIndex ? "step" : undefined}
                        aria-label={`Go to ${stage.title}, stage ${index + 1} of 6`}
                        onClick={() => scrollToStage(index)}
                      >
                        <span className={styles.progressNode} aria-hidden="true" />
                        <span className={styles.progressNumber}>{stage.num}</span>
                        <span className={styles.progressLabel}>{stage.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </Container>
          </div>
        </div>
      ) : (
        <div className={styles.sequentialJourney}>
          {exploreStages.map((stage, index) => (
            <article
              key={stage.slug}
              id={`explore-${stage.slug}`}
              className={`${styles.sequentialStage} ${styles[stage.tone]}`}
            >
              <div className={styles.scene} aria-hidden="true">
                <span className={styles.orb} />
                <span className={styles.ridgeFar} />
                <span className={styles.ridgeNear} />
                <span className={styles.trace} />
                {stage.slug === "participation" ? <span className={styles.figure} /> : null}
              </div>
              <Container className={styles.sequentialGrid}>
                <div className={styles.rail} aria-hidden="true">
                  <span className={styles.railNumber}>{stage.num}</span>
                  {index < exploreStages.length - 1 ? <span className={styles.railLine} /> : null}
                </div>
                <div className={styles.sequentialCopy}>
                  <p className={styles.stageTitle}>{stage.title}</p>
                  <h3>{stage.question}</h3>
                  <p className={styles.support}>{stage.support}</p>
                  <Link href={stage.href} className={styles.stageLink}>
                    Explore this idea <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Container>
            </article>
          ))}
        </div>
      )}

      <div className={styles.enterWrap}>
        <Link href="/explore" className={styles.enter}>
          Enter the full exploration <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
