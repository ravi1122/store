import React, { Component } from "react";
import cx from "classnames";

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    const slides = props.slides || [];

    this.state = {
      slides,
      activeSlide: 0,
      totalSlides: slides.length,
    };

    this.timer = null;
  }

  componentDidMount() {
    this.createInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onClickPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => {
      if (pS.activeSlide === 0) {
        return { activeSlide: pS.totalSlides - 1 };
      }

      return { activeSlide: pS.activeSlide - 1 };
    });
  };

  onClickNext = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => {
      if (pS.activeSlide + 1 === pS.totalSlides) {
        return { activeSlide: 0 };
      }

      return { activeSlide: pS.activeSlide + 1 };
    });
  };

  onMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    clearInterval(this.timer);
  };

  onMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.createInterval();
  };

  onClickIndicator = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const slideTo = e.currentTarget.getAttribute("data-slide-to");

    this.setState({ activeSlide: Number(slideTo) });
  };

  createInterval = () => {
    this.timer = setInterval(
      () =>
        this.setState((pS) => {
          if (pS.activeSlide + 1 === pS.totalSlides) {
            return { activeSlide: 0 };
          }

          return { activeSlide: pS.activeSlide + 1 };
        }),
      2000
    );
  };

  render() {
    const { activeSlide, slides } = this.state;

    return (
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <ol className="carousel-indicators">
          {slides.map((_slide, index) => (
            <li
              onClick={this.onClickIndicator}
              data-slide-to={index}
              className={cx({
                active: activeSlide === index,
              })}
            />
          ))}
        </ol>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              className={cx("carousel-item", {
                active: activeSlide === index,
              })}
            >
              <img
                src={slide.image}
                className="d-block w-100"
                alt={slide.label}
                height="600"
                width="1080"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slide.label}</h5>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-control-prev" onClick={this.onClickPrev}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </div>
        <div className="carousel-control-next" onClick={this.onClickNext}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </div>
      </div>
    );
  }
}
