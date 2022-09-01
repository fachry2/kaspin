'use strict'
const axios = require('axios')
const Logger = use('Logger')

class KaspinController {
	async findDataById ({ params, response }) {
		    const result = {
				status: 'data',
				data:{}
			}
			let code = 200
			try{
				const {id} = params
			    const res = await axios('https://kasirpintar.co.id/allAddress.txt')
			    let {address_kelurahan, address_kecamatan,address_kota, address_provinsi} =  res.data
			    const [provinsi,kota,kecamatan,kelurahan] = [2,4,7,10]

			    if (id.length == provinsi) {
				    result.data.key = 'provinsi'
				    result.data.value = address_provinsi.find(e=>e.id === id)
			    } else if(id.length == kota){
				    result.data.key = 'kota'
				    result.data.value = address_kota.find(e=>e.id === id)
			    }else if(id.length == kecamatan){
				    result.data.key = 'kecamatan'
				    result.data.value = address_kecamatan.find(e=>e.id === id)
			    }else if(id.length == kelurahan){
				    result.data.key = 'kelurahan'
				    result.data.value = address_kelurahan.find(e=>e.id ===id)
			    } else{
			    	code = 404
			    	result.status = 'Id not found'
			    }
			    if (!result.data.value) {
			    	code = 404
			    	result.data = {}
			    	result.status = 'Id not found'
			    }
			    return response.status(code).json(result)
			} catch(e){
				Logger.transport('file').error("Error : ", e)
				code = 500
				result.status = `Error: ${e.message}`
			    return response.status(code).json(result)
			}
		}

	async findDataByKotaId ({ params, response }) {
	    const result = {
			status: 'data',
			data:{}
		}
		let code = 200
		try{
			const {kota_id} = params
		    const res = await axios('https://kasirpintar.co.id/allAddress.txt')
		    let { address_kecamatan } =  res.data
		    const [provinsi,kota,kecamatan,kelurahan] = [2,4,7,10]

		    if(kota_id.length == kota){
			    result.data.key = 'kecamatan'
			    result.data.value = address_kecamatan.filter(e=>e.kota_id === kota_id)
		    } else{
		    	code = 404
		    	result.status = 'Id not found'
		    }
		    if (!result.data.value.length) {
		    	code = 404
		    	result.status = 'kecamatan not founds'
		    }
		    return response.status(code).json(result)
		} catch(e){
			Logger.transport('file').error("Error : ", e)
			code = 500
			result.status = `Error: ${e.message}`
		    return response.status(code).json(result)
		}
	}
}

module.exports = KaspinController
