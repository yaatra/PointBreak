import React, {Component} from 'react'

/**
 * COMPONENT
 */
class FitbitGraph extends Component {
    constructor(props){
        super(props)
    this.rendered = false
    }

    componentWillReceiveProps(nextProps){
        if (!this.rendered && nextProps.contentData.length > 0 ) {
            this.rendered = true
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
                    'content': nextProps.contentData
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
         }
    }

    shouldComponentUpdate(){
        return false
    }


  render() {

    const {user, contentData} = this.props
    console.log('Render of the Graph initiated...')


    return (
      <div>
      <div id="pieChart" />
      </div>
    )
  }
}

export default FitbitGraph
