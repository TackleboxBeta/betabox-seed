import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import HeadingRow from 'components/HeadingRow/HeadingRow';
import SectionContainer from 'components/SectionContainer/SectionContainer';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    const thumb = require('./images/thumbnail.png');

    return (
      <div className={styles.home}>
        <Helmet title="Home" />

        <Jumbotron>
          <Grid>
            <Row>
              <Col sm={12}>
                <h1>Tacklebox Betashop</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis
                  arcu ipsum, in convallis orci finibus vitae. Fusce risus purus, vestibulum
                  in purus ut, tristique pharetra nisi. Mauris a sodales dolor. Cras dignissim
                  turpis vel risus finibus, id lobortis mauris aliquam. Cras malesuada turpis
                  blandit faucibus tempor. Praesent ut cursus lectus. Nam ac metus tellus.</p>
                <p>
                  <LinkContainer to="/register">
                    <Button bsStyle="primary" bsSize="large">Get Started</Button>
                  </LinkContainer>
                </p>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>

        <SectionContainer pad={30}>
          <Grid>
            <HeadingRow>
              <h3>Sed convallis dui id ligula aliquam, sit amet fringilla mauris dignissim</h3>
              <p>Phasellus convallis sapien at vestibulum luctus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                Phasellus convallis sapien at vestibulum luctus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            </HeadingRow>

            <Row>
              <Col sm={12} md={4}>
                <h4>Content Title</h4>
                <p>Nunc eget ultricies lectus. Phasellus mollis fringilla tellus non hendrerit.
                  Vivamus efficitur leo non ipsum euismod, eu vehicula odio dignissim.</p>
              </Col>

              <Col sm={12} md={4}>
                <h4>Content Title</h4>
                <p>Ut vitae tortor sollicitudin, pellentesque nisi at, efficitur nisl. Ut vitae
                  tortor sollicitudin, pellentesque nisi at, efficitur nisl.</p>
              </Col>

              <Col sm={12} md={4}>
                <h4>Content Title</h4>
                <p>Phasellus convallis sapien at vestibulum luctus. Class aptent taciti sociosqu
                  ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
              </Col>
            </Row>
          </Grid>
        </SectionContainer>

        <SectionContainer pad={30}>
          <Grid>
            <HeadingRow>
              <h3>Ut vitae tortor sollicitudin, pellentesque nisi at, efficitur nisl</h3>
              <p>Class aptent ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            </HeadingRow>

            <Row>
              <Col sm={12} md={4}>
                <Image src={thumb} circle responsive />
              </Col>

              <Col sm={12} md={4}>
                <Image src={thumb} circle responsive />
              </Col>

              <Col sm={12} md={4}>
                <Image src={thumb} circle responsive />
              </Col>
            </Row>
          </Grid>
        </SectionContainer>
      </div>
    );
  }
}
