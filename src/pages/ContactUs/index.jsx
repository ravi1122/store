import React, { Component } from "react";

import Placeholder from "../../components/Svgs/Placeholder";

import { SITE_NAME } from "../../config";

export default class ContactUs extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-10 mx-auto mt-4">
          <Placeholder text={SITE_NAME} textFontSize="2rem" />
        </div>
        <div className="col-10 mx-auto mt-4 border-top border-success"></div>
        <div className="col-10 mx-auto mt-4">
          <h2>
            <u>Contact Us</u>
          </h2>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            saepe error cupiditate autem. Ad illo error tempore, accusantium
            sapiente molestias? Ea inventore nam reiciendis architecto non saepe
            vitae. Quo, voluptas? Illum, officia quis. Nostrum, sit deserunt
            quos, ipsam quas corporis accusantium ab hic asperiores, magni quis
            quam sequi molestiae. Eaque dignissimos delectus fugiat repellat
            temporibus vero molestiae cum aut beatae. Alias cum ducimus sunt!
            Hic pariatur aperiam esse blanditiis quo, natus aliquam. Culpa
            possimus, maxime amet debitis enim aut consequatur adipisci ut quis
            suscipit provident cupiditate ea placeat magni. Molestiae! Quasi,
            quaerat sequi qui minima, ut repellendus amet eveniet voluptatem
            assumenda nihil cupiditate iusto dolorem fugiat aperiam enim
            molestias, culpa debitis quis vel reiciendis quos maiores doloribus!
            Culpa, corrupti dolore. Rem sit facilis ratione eligendi velit animi
            assumenda corporis aliquam, saepe fugiat earum odit quaerat nulla
            porro nihil maiores, placeat delectus aut corrupti! Qui omnis, enim
            ipsum fugit aliquid nisi?
          </p>
          <ul>
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo, sequi.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
              consequatur tempora alias!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
              deleniti odit similique architecto rem earum.
            </li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
          </ul>
        </div>
        <div className="col-10 mx-auto mt-4 border-top border-success"></div>
        <div className="col-10 mx-auto mt-4">
          <h2>
            <u>Contact us</u>
          </h2>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut optio
            velit inventore, expedita quo laboriosam possimus ea consequatur
            vitae, doloribus consequuntur ex. Nemo assumenda laborum vel, labore
            ut velit dignissimos.
          </p>
        </div>
        <div className="col-10 mx-auto mt-4 border-top border-success"></div>
        <div className="col-10 mx-auto mt-4">
          <h2>
            <u>Contact us</u>
          </h2>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero odio
            fugiat voluptatem dolor, provident officiis, id iusto! Obcaecati
            incidunt, qui nihil beatae magnam et repudiandae ipsa
            exercitationem, in, quo totam.
          </p>
        </div>
      </div>
    );
  }
}
