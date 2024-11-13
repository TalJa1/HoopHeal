/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  containerStyle,
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {arrowDownIcon, homeUpperProgressIcon} from '../../assets/svgIcon';
import {ProgressRightComponentProps} from '../../services/typeProps';
import * as d3 from 'd3-shape';
import Svg, {
  Rect,
  Line,
  G,
  Text as SvgText,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Polygon,
} from 'react-native-svg';
import * as Progress from 'react-native-progress';

const ProgressView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <UpperProgress />
          <Matplotlib />
          <BarChartView />
          <WeeklyHistory />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WeeklyHistory: React.FC = () => {
  const data = [10, 40, 60, 80, 50, 30, 70, 90]; // Example data for the line chart
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

  const chartWidth = vw(90);
  const chartHeight = vh(40);
  const padding = 30;
  const stepX = (chartWidth - padding * 2) / (weeks.length - 1);
  const stepY = (chartHeight - padding * 2) / 100;

  const line = d3
    .line<number>()
    .x((d, i) => padding + i * stepX)
    .y(d => chartHeight - padding - d * stepY)
    .curve(d3.curveCatmullRom.alpha(0.5));
  return (
    <View style={styles.barchart}>
      <Text style={styles.todayTitle}>Weekly History & Progress</Text>
      <View>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#F87643" stopOpacity="0.5" />
              <Stop offset="1" stopColor="#F87643" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <G>
            {weeks.map((week, index) => (
              <SvgText
                key={index}
                x={padding + index * stepX}
                y={chartHeight - padding + 15}
                fontSize="10"
                fill="#8D9092"
                textAnchor="middle">
                {week}
              </SvgText>
            ))}
            {[0, 20, 40, 60, 80, 100].map((value, index) => (
              <React.Fragment key={index}>
                <SvgText
                  x={padding - 10}
                  y={chartHeight - padding - value * stepY}
                  fontSize="10"
                  fill="#8D9092"
                  textAnchor="end">
                  {value}
                </SvgText>
                <Line
                  x1={padding}
                  y1={chartHeight - padding - value * stepY}
                  x2={chartWidth - padding}
                  y2={chartHeight - padding - value * stepY}
                  stroke="#8D9092"
                  strokeDasharray="4"
                />
              </React.Fragment>
            ))}
            <Path
              d={line(data) as string}
              stroke="#F87643"
              strokeWidth="2"
              fill="none"
            />
            <Polygon
              points={
                data
                  .map(
                    (d, i) =>
                      `${padding + i * stepX},${
                        chartHeight - padding - d * stepY
                      }`,
                  )
                  .join(' ') +
                ` ${chartWidth - padding},${chartHeight - padding} ${padding},${
                  chartHeight - padding
                }`
              }
              fill="url(#grad)"
            />
            {data.map((value, index) => (
              <Circle
                key={index}
                cx={padding + index * stepX}
                cy={chartHeight - padding - value * stepY}
                r={4}
                fill="#F87643"
              />
            ))}
          </G>
        </Svg>
      </View>
    </View>
  );
};

const BarChartView: React.FC = () => {
  const data = [10, 40, 60, 72, 79, 0, 0, 0]; // Example data for the bar chart
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

  const chartWidth = vw(90);
  const chartHeight = vh(40);
  const padding = 30;
  const barWidth = (chartWidth - padding * 2) / data.length - 10;
  const stepY = (chartHeight - padding * 2) / 100;
  const barRadius = 15;
  return (
    <View style={styles.barchart}>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <Text style={styles.strenght}>Strenght</Text>
        <View style={[rowCenter, styles.weeks8]}>
          <Text style={{color: 'white'}}>8weeks</Text>
          {arrowDownIcon(vw(5), vw(5), 'white')}
        </View>
      </View>
      <View>
        <Svg width={chartWidth} height={chartHeight}>
          <G>
            {weeks.map((week, index) => (
              <SvgText
                key={index}
                x={padding + index * (barWidth + 10) + barWidth / 2}
                y={chartHeight - padding + 15}
                fontSize="10"
                fill="white"
                textAnchor="middle">
                {week}
              </SvgText>
            ))}
            {[0, 20, 40, 60, 80, 100].map((value, index) => (
              <SvgText
                key={index}
                x={chartWidth - padding + 10}
                y={chartHeight - padding - value * stepY}
                fontSize="10"
                fill="#8D9092"
                textAnchor="start">
                {value}
              </SvgText>
            ))}
            <Line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="black"
            />
            <Line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={chartHeight - padding}
              stroke="black"
            />
            {data.map((value, index) => (
              <React.Fragment key={index}>
                <Rect
                  x={padding + index * (barWidth + 10)}
                  y={padding}
                  width={barWidth}
                  height={chartHeight - padding * 2}
                  fill="#A3A3F25C"
                  rx={barRadius}
                  ry={barRadius}
                />
                <Rect
                  x={padding + index * (barWidth + 10)}
                  y={chartHeight - padding - value * stepY}
                  width={barWidth}
                  height={value * stepY}
                  fill="#A3A3F2"
                  rx={barRadius}
                  ry={barRadius}
                />
              </React.Fragment>
            ))}
          </G>
        </Svg>
      </View>
    </View>
  );
};

const Matplotlib: React.FC = () => {
  const data1 = [2, 8, 6, 2, 6, 7, 1]; // Example data for Pain level
  const data2 = [10, 40, 20, 25, 80, 10, 26]; // Example data for Range of motion
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [selectedData, setSelectedData] = useState<{
    day: string;
    value: number;
    type: string;
  } | null>(null);

  const chartWidth = vw(90);
  const chartHeight = vh(40);
  const padding = 30;
  const stepX = (chartWidth - padding * 2) / (days.length - 1);
  const stepY1 = (chartHeight - padding * 2) / 10;
  const stepY2 = (chartHeight - padding * 2) / 80;

  const line1 = d3
    .line<number>()
    .x((d: number, i: number) => padding + i * stepX)
    .y((d: number) => chartHeight - padding - d * stepY1)
    .curve(d3.curveCatmullRom.alpha(0.5));

  const line2 = d3
    .line<number>()
    .x((d: number, i: number) => padding + i * stepX)
    .y((d: number) => chartHeight - padding - d * stepY2)
    .curve(d3.curveCatmullRom.alpha(0.5));

  const handlePress = (day: string, value: number, type: string) => {
    setSelectedData({day, value, type});
  };

  return (
    <View style={styles.matplotlib}>
      <Text style={styles.todayTitle}>Detailed Recovery Metrics</Text>
      <View style={{marginVertical: vh(1)}}>
        <View style={[rowCenter, {columnGap: vw(4)}]}>
          <View style={[rowCenter, {columnGap: vw(1)}]}>
            <View style={styles.purple} />
            <Text style={styles.matplotTxt}>Pain level</Text>
          </View>
          <View style={[rowCenter, {columnGap: vw(1)}]}>
            <View style={styles.orange} />
            <Text style={styles.matplotTxt}>Range of motion</Text>
          </View>
        </View>
        <View
          style={[
            rowCenter,
            {position: 'absolute', bottom: 0, right: 0},
            styles.matDropdown,
          ]}>
          <Text style={styles.matplotTxt}>7 days</Text>
          {arrowDownIcon(vw(5), vw(5), 'white')}
        </View>
      </View>
      <View>
        <Svg width={chartWidth} height={chartHeight}>
          <G>
            {days.map((day, index) => (
              <SvgText
                key={index}
                x={padding + index * stepX}
                y={chartHeight - padding + 15}
                fontSize="10"
                fill="#8D9092"
                textAnchor="middle">
                {day}
              </SvgText>
            ))}
            {[0, 2, 4, 6, 8, 10].map((value, index) => (
              <SvgText
                key={index}
                x={padding - 10}
                y={chartHeight - padding - value * stepY1}
                fontSize="10"
                fill="#8D9092"
                textAnchor="end">
                {value}
              </SvgText>
            ))}
            {[0, 20, 40, 60, 80].map((value, index) => (
              <SvgText
                key={index}
                x={chartWidth - padding + 10}
                y={chartHeight - padding - value * stepY2}
                fontSize="10"
                fill="#8D9092"
                textAnchor="start">
                {value}
              </SvgText>
            ))}
            <Line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="black"
            />
            <Line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={chartHeight - padding}
              stroke="black"
            />
            <Path
              d={line1(data1) as string}
              stroke="#F87643"
              strokeWidth="2"
              fill="none"
            />
            <Path
              d={line2(data2) as string}
              stroke="#A3A3F2"
              strokeWidth="2"
              fill="none"
            />
            {data1.map((value, index) => (
              <TouchableOpacity
                key={`data1-${index}`}
                onPress={() => handlePress(days[index], value, 'Pain level')}>
                <Circle
                  cx={padding + index * stepX}
                  cy={chartHeight - padding - value * stepY1}
                  r={4}
                  fill="#F87643"
                />
              </TouchableOpacity>
            ))}
            {data2.map((value, index) => (
              <TouchableOpacity
                key={`data2-${index}`}
                onPress={() =>
                  handlePress(days[index], value, 'Range of motion')
                }>
                <Circle
                  cx={padding + index * stepX}
                  cy={chartHeight - padding - value * stepY2}
                  r={4}
                  fill="#A3A3F2"
                />
              </TouchableOpacity>
            ))}
          </G>
        </Svg>
      </View>
      {selectedData && (
        <View style={styles.dataTooltip}>
          <Text style={{color: 'white'}}>{`${selectedData.value}`}</Text>
        </View>
      )}
    </View>
  );
};

const UpperProgress: React.FC = () => {
  const progress = 0.4;
  return (
    <View style={styles.upperProgress}>
      <View style={styles.progressLeft}>
        <Text style={styles.recoverTxt}>Recovery Progress</Text>
        {/* render here */}
        <Progress.Circle
          size={vw(28)}
          progress={progress}
          showsText={false}
          color={'#03020B'}
          unfilledColor={'#BABABA'}
          style={{alignItems: 'center', justifyContent: 'center'}}
          borderWidth={0}
          thickness={10}>
          <View style={styles.progressTextWrapper}>
            <Text style={styles.progressText}>{`${Math.round(
              progress * 100,
            )}%`}</Text>
          </View>
        </Progress.Circle>
      </View>
      <View style={styles.progressRight}>
        <ProgressRightComponent label="Timing" description="3w remaining" />
        <ProgressRightComponent
          label="Milestone"
          description="Achieved 75% mobility"
        />
        <ProgressRightComponent
          label="Completed excer"
          description="80% this week"
        />
      </View>
    </View>
  );
};

const ProgressRightComponent: React.FC<ProgressRightComponentProps> = ({
  description,
  label,
}) => {
  const renderStyledText = (text: string) => {
    return text.split(/(\d+\S*\s)/).map((part, index) => {
      const isNumber = /^\d/.test(part);
      return (
        <Text
          key={index}
          style={isNumber ? styles.numberText : styles.letterText}>
          {part}
        </Text>
      );
    });
  };

  return (
    <View>
      <Text>{label}</Text>
      {homeUpperProgressIcon('100%', 10)}
      <Text>{renderStyledText(description)}</Text>
    </View>
  );
};

export default ProgressView;

const styles = StyleSheet.create({
  container: containerStyle,
  upperProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(5),
    marginTop: vh(2),
    backgroundColor: '#F87643',
    paddingHorizontal: vw(4),
    paddingVertical: vh(3),
    borderRadius: 20,
  },
  progressLeft: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: vw(2),
    paddingVertical: vh(2),
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: vh(2),
  },
  progressRight: {
    height: '100%',
    backgroundColor: '#F87643',
    borderRadius: 10,
    rowGap: vh(1),
  },
  recoverTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  progressText: {
    color: '#03020B',
    fontWeight: '900',
    fontSize: 20,
  },
  progressTextWrapper: {
    position: 'absolute',
    backgroundColor: '#F87643',
    borderRadius: vw(50),
    width: vw(20),
    height: vw(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: 'black',
  },
  letterText: {
    color: 'white',
  },
  matplotlib: {
    marginHorizontal: vw(5),
    marginVertical: vh(2),
  },
  purple: {
    width: 11,
    height: 11,
    borderRadius: 4,
    backgroundColor: '#A3A3F2',
  },
  orange: {
    width: 11,
    height: 11,
    borderRadius: 4,
    backgroundColor: '#F87643',
  },
  matplotTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  matDropdown: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: vw(2),
    paddingVertical: 3,
  },
  dataTooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    top: 10,
    right: 10,
  },
  todayTitle: {
    color: '#F87643',
    fontSize: 20,
    fontWeight: '900',
  },
  barchart: {
    marginHorizontal: vw(5),
    marginVertical: vh(2),
  },
  strenght: {
    color: '#A3A3F2',
    fontSize: 18,
  },
  weeks8: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: vw(2),
    paddingVertical: 3,
  },
});
