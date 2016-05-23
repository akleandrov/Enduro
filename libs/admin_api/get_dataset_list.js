// * ———————————————————————————————————————————————————————— * //
// * 	get concated global dataset list
// *
// * 	admin api endpoint admin_api/get_datasetlist
// *	@return {response} - success boolean and flattened dataset list in an array
// * ———————————————————————————————————————————————————————— * //
var api_call = function () {}

// vendor dependencies
var Promise = require('bluebird')

// local dependencies
var pagelist_generator = require(ENDURO_FOLDER + '/libs/build_tools/pagelist_generator')
var admin_sessions = require(ENDURO_FOLDER + '/libs/admin_utilities/admin_sessions')

// routed call
api_call.prototype.call = function(req, res, enduro_server){

	admin_sessions.get_user_by_session(req.query.sid)
		.then((user) => {
			return pagelist_generator.get_flat_datalist()
		}, (user) => {
			throw new Error('abort promise chain');
		})
		.then((pagelist) => {
			res.send({success: true, data: pagelist})
		}, () => {
			res.send({success: false, message: 'session not valid'})
		})
}

module.exports = new api_call()