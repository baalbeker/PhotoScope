import { useState } from "react";
import "./FortuneWheel.css";

const FortuneWheel = () => {
  const defaultElements = Array(10).fill({ label: "sss", percentage: 10 });

  const [wheelElements, setWheelElements] = useState(defaultElements);
  const [checkboxes, setCheckboxes] = useState(Array(10).fill(true));
  const [inputValues, setInputValues] = useState(defaultElements);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelStyle, setWheelStyle] = useState({});

  const colorPalette = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#A133FF", // Purple
    "#FFD700", // Yellow
    "#FF8C00", // Orange
    "#800080", // Purple
    "#00BFFF", // Deep Sky Blue
    "#C71585", // Medium Violet Red
  ];

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);
  };

  const handleInputChange = (index, type, value) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = { ...updatedInputValues[index], [type]: value };
    setInputValues(updatedInputValues);
  };

  const handleApply = () => {
    const elements = [];
    let totalPercentage = 0;
    checkboxes.forEach((checked, index) => {
      if (checked) {
        const { label, percentage } = inputValues[index];
        if (label && percentage > 0) {
          elements.push({ label, percentage: parseFloat(percentage) });
          totalPercentage += parseFloat(percentage);
        }
      }
    });
    if (totalPercentage !== 100) {
      alert("Total percentage must equal 100.");
      return;
    }
    setWheelElements(elements);
  };

  const spinWheel = () => {
    if (isSpinning || wheelElements.length === 0) return;
    setWheelStyle({
      transform: "rotate(0deg)",
      transition: "none",
    });
    setIsSpinning(true);
    const winningIndex = Math.floor(Math.random() * wheelElements.length);
    const segmentAngle = 360 / wheelElements.length;
    const winningAngle = segmentAngle * winningIndex;
    const extraSpins = 360 * (Math.floor(Math.random() * 7) + 3);
    const totalRotation = extraSpins + (360 - winningAngle);
    const spinDuration = Math.random() * 3 + 3;
    setTimeout(() => {
      setWheelStyle({
        transform: `rotate(${totalRotation}deg)`,
        transition: `transform ${spinDuration}s ease-out`,
      });
      setTimeout(() => {
        setIsSpinning(false);
      }, spinDuration * 1000);
    }, 50);
  };

  return (
    <div className="fw-container">
      <div className="fw-menu">
        <div className="fw-menu-content">
          {checkboxes.map((checked, index) => (
            <div key={index} className="fw-menu-item">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <input
                type="text"
                placeholder="Label"
                value={inputValues[index].label}
                onChange={(e) =>
                  handleInputChange(index, "label", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Percentage"
                value={inputValues[index].percentage}
                onChange={(e) =>
                  handleInputChange(index, "percentage", e.target.value)
                }
              />
            </div>
          ))}
          <button className="fw-apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>

      <div className="fw-wheel-container">
        <div className="fw-wheel" style={wheelStyle}>
          {wheelElements.map((element, index) => {
            const startAngle = wheelElements
            .slice(0, index)
            .reduce((sum, el) => sum + (el.percentage / 100) * 360, 0);
            
          const segmentAngle = (element.percentage / 100) * 360;
          const color = colorPalette[index % colorPalette.length];
            return (

              <div
                key={index}
                className="fw-segment"
                style={{
                  position: "absolute",
                  height: "50%",
                  top: "0",
                  left: "50%",
                  transformOrigin: "0% 100%",
                  background: `${color}`,
                  transform: `rotate(${startAngle}deg) skewY(-${90 - segmentAngle}deg)`,
                  border: "4px solid black",
                }}
              >
                <span className="fw-label">{element.label}</span>
              </div>
            );
          })}
        </div>

        <div className="fw-triangle-icon" />
      </div>

      <button
        className="fw-spin-button"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? "Who is the nigger?..." : "Врътни"}
      </button>
    </div>
  );
};

export default FortuneWheel;
