import React, {Component} from 'react'

/**
 * COMPONENT
 */
class FitbitGraph extends Component {
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(){
        if (this.props.contentData.length > 0) {
            return false
        } else {
            return true
        }
    }

  render() {
    const {user, contentData} = this.props

    var pie = new d3pie('pieChart', {
        'header': {
            'title': {
                'text': 'Week Step Summary',
                'fontSize': 16,
                'font': 'open sans'
            },
            'subtitle': {
                // 'text': 'Steps taken this week',
                'color': '#999999',
                'fontSize': 12,
                'font': 'open sans'
            },
            'titleSubtitlePadding': 9
        },
        'footer': {
            'color': '#999999',
            'fontSize': 10,
            'font': 'open sans',
            'location': 'bottom-right'
        },
        'size': {
            'canvasHeight': 400,
            'canvasWidth': 520,
            'pieOuterRadius': '90%'
        },
        'data': {
            'sortOrder': 'value-desc',
            'content': contentData
        },
        'labels': {
            'outer': {
                'pieDistance': 32
            },
            'inner': {
                'hideWhenLessThanPercentage': 3
            },
            'mainLabel': {
                'fontSize': 11
            },
            'percentage': {
                'color': '#ffffff',
                'decimalPlaces': 0
            },
            'value': {
                'color': '#adadad',
                'fontSize': 11
            },
            'lines': {
                'enabled': true
            },
            'truncation': {
                'enabled': true
            }
        },
        'effects': {
            'load': {
                'speed': 1380
            },
            'pullOutSegmentOnClick': {
                'speed': 380,
                'size': 8
            }
        },
        'misc': {
            'gradient': {
                'enabled': true,
                'percentage': 100
            }
        }
    })

    return (
      <div>
        {contentData.length ?
            <div>
            <h5>Fitbit summary Info</h5>
            <p>{user.fitbitInfo ? user.fitbitInfo.monthAverageSteps : 0} average monthly steps</p>
            </div>
        :
            <div>
            <h5>No fitbit data yet</h5>
            </div>
        }
        <div id="pieChart" />
      </div>
    )
  }
}

export default FitbitGraph
