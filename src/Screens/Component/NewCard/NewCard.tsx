import "./NewCard.css";

import {
  Add,
  InfoOutlined,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import React, { useState } from "react";

import cardimg from "../../../assets/Images/Card_Image.png";

const NewCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const renderTooltip = (text: string) => (
    <Tooltip id="tooltip">{text}</Tooltip>
  );

  return (
    <Card
      className={`listItem ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-img">
        <Card.Img src={cardimg} alt="title" />
        {isHovered && (
          <div className="itemInfo">
            <Row>
              <Col xs={12} sm={6}>
                <div className="icons">
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip("Play")}
                  >
                    <PlayArrow className="icon playIcon" />
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip("Add")}
                  >
                    <Add className="icon addIcon" />
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip("Thumb Up")}
                  >
                    <ThumbUpAltOutlined className="icon thumbsUpIcon" />
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip("Thumb Down")}
                  >
                    <ThumbDownOutlined className="icon thumbsDownIcon" />
                  </OverlayTrigger>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="icons" style={{ marginLeft: "60%" }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip("Info")}
                  >
                    <InfoOutlined className="icon infoIcon" />
                  </OverlayTrigger>
                </div>
              </Col>
            </Row>
            <div className="desc">
              <span className="match">98% Match</span>{" "}
              <span className="age">18+</span>{" "}
              <span className="season">2021 New</span>
            </div>
            <div className="genre-list">
              <ul className="list-unstyled">
                <li className="genre-item">Action</li>
                <li className="genre-item">Romantic</li>
                <li className="genre-item">Slick</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NewCard;
