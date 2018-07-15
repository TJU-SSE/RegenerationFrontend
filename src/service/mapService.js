import htmlRequest from '../service/htmlRequest'

export default {
  getLayer: async (context) => {
    try {
      let response = await htmlRequest(context, '/layer/layers?mapId=' + 209)
      return response.body
    } catch (exception) {
      return {code: 100, exception: exception}
    }
  }
}
