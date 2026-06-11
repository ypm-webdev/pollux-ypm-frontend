import styled from 'styled-components'

import { ToppedBorderedDiv } from '../../shared/BorderedDiv'
import theme from '../../theme'

const padX = theme.spacing.sectionPaddingX
const marginX = theme.spacing.contentAbsMarginX

const bubbleBaseGrid = 8
const bubbleSpreadFactor = 12

const bubbleSize = bubbleBaseGrid * 20

const InfographicsSection = styled(ToppedBorderedDiv)`
  margin-bottom: ${theme.spacing.landingPageSectionGap};
  padding: 37px ${padX} 25px ${padX};
  background-color: ${theme.color.white};
  overflow-x: hidden;
  margin-left: ${marginX};
  margin-right: ${marginX};
  @media (max-width: ${theme.breakpoints.md}px) {
    margin-left: 0;
    margin-right: 0;
  }

  h2 {
    // margin-bottom: 20px;
    font-family: 'Mallory Black', sans-serif;
    color: #000000;
    letter-spacing: 1px;
    line-height: ${theme.font.mobile.h2.lineHeight};
    font-size: ${theme.font.mobile.h2.size};
    font-weight: ${theme.font.mobile.h2.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h2.size};
      line-height: ${theme.font.desktop.h2.lineHeight};
    }
  }

  div.card-outer {
    width: 100%;
  }

  div.card-inner {
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
    padding-bottom: 30px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: ${theme.color.secondary.cornflowerBlue};
    width: 100%;
    min-width: 300px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      // min-width: 450px;
      padding-top: 1em;
      padding-bottom: 1em;
    }

    @media (min-width: ${theme.breakpoints.sm}px) {
      // width: auto;
      padding-top: 1em;
      padding-bottom: 1em;
    }
  }

  img.icon {
    width: 60px;
    height: 60px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      width: 90px;
      height: 90px;
    }
  }

  div.number {
    margin-bottom: 0px;
    font-family:
      Mallory Light,
      sans-serif;
    font-size: 2em;
    font-weight: ${theme.font.weight.extraLight};
    color: ${theme.color.black};
    letter-spacing: -2px;
    line-height: 1em;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 2.5em;
    }
    @media (min-width: ${theme.breakpoints.sm}px) {
      font-size: 3em;
    }
  }

  div.label {
    padding-left: 3px;
    font-family: Mallory Bold, sans-serif;
    font-size: 1.5em;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.black};
    letter-spacing: 0;
    text-align: left;
    // line-height: 32px;
    line-height: 1.2em;

    @media (min-width: ${theme.breakpoints.sm}px) {
      font-weight: ${theme.font.weight.bold};
    }
  }

  div#about-numbers-disclaimer {
    padding: 2em;
  }

  .bubbles {
    --base-grid: ${bubbleBaseGrid};
    --bubble-size: calc(${bubbleBaseGrid}*24);
    color: ${theme.color.black};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 700px;
  }

  .bubbles__list {
    position: relative;
    list-style: none;
    display: block;
  }

  .bubbles__item {
    width: ${bubbleSize}px;
    height: ${bubbleSize}px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: ${bubbleSize / -2}px;
    margin-left: ${bubbleSize / -2}px;
    --angle: calc(360deg / var(--item-total));
    --rotation: calc(180deg + var(--angle) * var(--item-count));
    transform: rotate(var(--rotation))
      translate(${bubbleSize + bubbleBaseGrid * bubbleSpreadFactor}px)
      rotate(calc(var(--rotation) * -1));
  }

  .bubbles__link {
    opacity: 0;
    animation: on-load 0.3s ease-in-out forwards;
    animation-delay: calc(var(--item-count) * 250ms);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    background-color: ${theme.color.offWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .bubbles__number {
    font-size: ${bubbleBaseGrid * 4}px;
    font-family:
      Mallory Light,
      sans-serif;
    font-weight: ${theme.font.weight.extraLight};
    color: ${theme.color.black};
    letter-spacing: -2px;
    transition: all 0.3s ease-in-out;
  }

  .bubbles__icon {
    width: ${bubbleBaseGrid * 8}px;
    height: ${bubbleBaseGrid * 8}px;
    transition: all 0.3s ease-in-out;
    transform: translateY(-5px);
  }

  .bubbles__label {
    position: absolute;
    width: 100%;
    white-space: nowrap;
    left: 0;
    text-align: center;
    height: ${bubbleBaseGrid * 2}px;
    display: none;
    bottom: ${bubbleBaseGrid * 8.5}px;
    animation: text 0.3s ease-in-out forwards;
    font-family:
      Mallory Bold,
      sans-serif;
    font-size: ${bubbleBaseGrid * 2.5}px;
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.black};
    z-index: 20;
    transition: all 0.3s ease-in-out;
  }

  .bubbles__link:after {
    content: '';
    background-color: transparent;
    width: ${bubbleSize}px;
    height: ${bubbleSize}px;
    border: 2px dashed ${theme.color.lightGray};
    display: block;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s cubic-bezier(0.53, -0.67, 0.73, 0.74);
    transform: none;
    opacity: 0;
  }

  .bubbles__link:hover .bubbles__icon {
    transition: all 0.3s ease-in-out;
    transform: translateY(${bubbleBaseGrid * -2 - 5}px) scale(1);
  }

  .bubbles__link:hover .bubbles__number {
    transition: all 0.3s ease-in-out;
    transform: translateY(${bubbleBaseGrid * -2}px);
    font-size: ${bubbleBaseGrid * 5}px;
  }

  .bubbles__link:hover .bubbles__label {
    display: block;
  }

  .bubbles__link:hover:after {
    transition: all 0.3s cubic-bezier(0.37, 0.74, 0.15, 1.65);
    transform: scale(1.1);
    opacity: 1;
  }

  @keyframes on-load {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    70% {
      opacity: 0.7;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes text {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(${bubbleBaseGrid * 5}px);
    }
  }
`

export default InfographicsSection
