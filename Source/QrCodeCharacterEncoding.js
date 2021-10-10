
class QrCodeCharacterEncoding
{
	constructor(id, name, bytesToString, stringToBytes)
	{
		this.id = id;
		this.name = name;
		this.bytesToString = bytesToString;
		this.stringToBytes = stringToBytes;
	}

	static Instances()
	{
		if (QrCodeCharacterEncoding._instances == null)
		{
			QrCodeCharacterEncoding._instances =
				new QrCodeCharacterEncoding_Instances();
		}
		return QrCodeCharacterEncoding._instances;
	}
}

class QrCodeCharacterEncoding_Instances
{
	constructor()
	{
		this.Alphanumeric = new QrCodeCharacterEncoding
		(
			1, // id
			"Alphanumeric",

			(bytesToConvert) =>
			{
				var stringConverted = "";

				bytesToConvert.forEach(x =>
				{
					var byteAsChar = null;
					if (x < 10)
					{
						byteAsChar = "" + x;
					}
					else
					{
						byteAsChar = string.fromCharCode(x - 10 + 65);
					}
					returnValue += byteAsChar;
				});

				return stringConverted;
			},

			(stringToConvert) =>
			{
				var bytesConverted = [];
				for (var i = 0; i < stringToConvert.length; i++)
				{
					var charAsString = stringToConvert[i];

					var byteConverted = stringToConvert.charCodeAt(i);

					if (byteConverted < 48)
					{
						if (charAsString == ".")
						{
							byteConverted = 42;
						}
						else
						{
							throw("Not implemented!");
						}
					}
					else if (byteConverted <= 57)
					{
						byteConverted = byteConverted - 48;
					}
					else if (byteConverted >= 65 && byteConverted <= 90)
					{
						// Uppercase.
						byteConverted = byteConverted - "A".charCodeAt(0) + 10;
					}
					else if (byteConverted < 97)
					{
						// Punctuation?
						var charAsString = stringToConvert[i];

						throw("Not yet implemented!");
					}
					else if (byteConverted <= 122)
					{
						// Lowercase.
						byteConverted = byteConverted - "a".charCodeAt(0) + 10;
					}
					else
					{
						if (charAsString == " ")
						{
							byteConverted = 36;
						}
						else
						{
							throw("Char not yet implemented or not in charset: " + charAsString);
						}
					}

					bytesConverted.push(byteConverted);
				}
				return bytesConverted;
			}
		);

		this._All =
		[
			this.Alphanumeric
		];
	}
}
