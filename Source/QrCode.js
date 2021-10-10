
class QrCode
{
	constructor(versionId, errorCorrectionLevelId, maskId, dataAsString)
	{
		this.versionId = versionId;
		this.errorCorrectionLevelId = errorCorrectionLevelId;
		this.maskId = maskId;
		this.dataAsString = dataAsString;
	}

	errorCorrectionLevel()
	{
		return QrCodeErrorCorrectionLevel.byId(this.errorCorrectionLevelId);
	}

	mask()
	{
		return QrCodeCellMask.byId(this.maskId);
	}

	toCanvas()
	{
		var encoding =
			QrCodeCharacterEncoding.Instances().Alphanumeric; // todo

		var dataAsBytes =
			encoding.stringToBytes(this.dataAsString);

		var d = document;
		var canvas = d.createElement("canvas");

		var graphics = canvas.getContext("2d");
		graphics.strokeStyle == "LightGray";

		var version = this.version();
		var dimensionInCells = version.sizeInCells.x;

		var dimensionInPixels = 128;
		var sizeInPixels =
			Coords.ones().multiplyScalar(dimensionInPixels);
		var sizeInCells =
			Coords.ones().multiplyScalar(dimensionInCells);
		var cellSizeInPixels =
			sizeInPixels.clone().divide(sizeInCells);

		var cellPosInCells = Coords.zeroes();
		var drawPos = Coords.zeroes();

		// Draw the corner squres.

		var cornerSquareSizeInCells = Coords.ones().multiplyScalar(7);
		var cornerSquarePositionsInCells =
		[
			new Coords(0, 0),
			new Coords
			(
				sizeInCells.x - cornerSquareSizeInCells.x, 0
			),
			new Coords
			(
				0, sizeInCells.y - cornerSquareSizeInCells.y
			)
		];

		for (var i = 0; i < cornerSquarePositionsInCells.length; i++)
		{
			var cornerSquarePosInCells =
				cornerSquarePositionsInCells[i];

			this.toCanvas_Square
			(
				graphics,
				cellSizeInPixels,
				cornerSquareSizeInCells,
				cornerSquarePosInCells
			);
		}

		// Draw the alignment square.

		var alignmentSquareSizeInCells = Coords.ones().multiplyScalar(5);

		var alignmentSquarePositionsInCells =
		[
			sizeInCells.clone().subtract(cornerSquareSizeInCells).subtract(Coords.ones().double())
		];

		for (var i = 0; i < alignmentSquarePositionsInCells.length; i++)
		{
			var alignmentSquarePosInCells =
				alignmentSquarePositionsInCells[i];

			this.toCanvas_Square
			(
				graphics,
				cellSizeInPixels,
				alignmentSquareSizeInCells,
				alignmentSquarePosInCells
			);
		}

		// Draw the format lines.

		var formatLineStartPositionsAndDirections =
		[
			[
				new Coords(0, cornerSquareSizeInCells.y + 1), // startPos
				new Coords(1, 0) // direction
			],
			[
				new Coords(cornerSquareSizeInCells.x + 1, sizeInCells.y - 1), // startPos
				new Coords(0, -1) // direction
			]
		];

		var bitsPerByte = 8;

		var formatLineAsByte =
			(this.errorCorrectionLevelId << 6)
			+ (this.maskId << 3)
			+ 7; // Fill in the rest with white for now.

		for (var f = 0; f < formatLineStartPositionsAndDirections.length; f++)
		{
			var formatLineStartPosAndDirection =
				formatLineStartPositionsAndDirections[f];

			var startPos = formatLineStartPosAndDirection[0];
			var direction = formatLineStartPosAndDirection[1];

			for (var i = 0; i < bitsPerByte; i++)
			{
				cellPosInCells.overwriteWith
				(
					direction
				).multiplyScalar
				(
					i
				).add
				(
					startPos
				);

				drawPos.overwriteWith(cellPosInCells).multiply(cellSizeInPixels);

				var bitValue = (formatLineAsByte >> (bitsPerByte - i - 1)) & 1;
				graphics.fillStyle = (bitValue == 0 ? "Black" : "White");
				graphics.fillRect
				(
					drawPos.x, drawPos.y,
					cellSizeInPixels.x, cellSizeInPixels.y
				)
			}
		}

		// Draw the data and error correction cells.

		var errorCorrectionLevel = this.errorCorrectionLevel();
		var mask = this.mask();

		var regions = version.byteRegions;

		for (var r = 0; r < regions.length; r++)
		{
			var region = regions[r];

			var regionPos = region.positionOfUpperLeftCell;
			var regionShape = region.shape();
			var cellOffsetsWithinRegion =
				regionShape.bitOffsetsInOrderIncreasing;

			for (var ro = 0; ro < cellOffsetsWithinRegion.length; ro++)
			{
				var cellOffsetWithinRegion =
					cellOffsetsWithinRegion[ro];

				cellPosInCells.overwriteWith
				(
					regionPos
				).add
				(
					cellOffsetWithinRegion
				);

				var bitIndex =
					r * bitsPerByte + ro;

				var byteIndex =
					Math.floor(bitIndex / bitsPerByte);
				var bitOffsetWithinByte = bitIndex % bitsPerByte;

				var byteValue = dataAsBytes[byteIndex];
				var cellValue =
					(byteValue >> (bitsPerByte - 1 - bitOffsetWithinByte)) & 1;

				drawPos.overwriteWith
				(
					cellPosInCells
				).multiply
				(
					cellSizeInPixels
				);

				var isCellInvertedByMask =
					mask.cellAtPosIsInverted(cellPosInCells);
				if (isCellInvertedByMask)
				{
					cellValue = 1 - cellValue;
				}

				graphics.fillStyle =
					(cellValue == 0 ? "Black" : "White");

				graphics.fillRect
				(
					drawPos.x, drawPos.y,
					cellSizeInPixels.x, cellSizeInPixels.y
				);

				graphics.strokeRect
				(
					drawPos.x, drawPos.y,
					cellSizeInPixels.x, cellSizeInPixels.y
				);
			}
		}

		return canvas;
	}

	toCanvas_Square
	(
		graphics, cellSizeInPixels, sizeInCells, posInCells
	)
	{
		var centerPosInCells = 
			sizeInCells.clone().subtract
			(
				Coords.ones()
			).half();

		var radiusOfWhiteRing = centerPosInCells.x - 1;

		var cellOffsetInCells = Coords.zeroes();
		var cellPosInCells = Coords.zeroes();
		var drawPos = Coords.zeroes();
		var cellDisplacementFromCenter = Coords.zeroes();

		for (var y = 0; y < sizeInCells.y; y++)
		{
			cellOffsetInCells.y = y;

			for (var x = 0; x < sizeInCells.x; x++)
			{
				cellOffsetInCells.x = x;

				var cellDistanceFromCenter =
					cellDisplacementFromCenter.overwriteWith
					(
						cellOffsetInCells
					).subtract
					(
						centerPosInCells
					).absolute().dimensionGreatest();

				var isCellWhite =
				(
					cellDistanceFromCenter == radiusOfWhiteRing
					|| cellDistanceFromCenter == radiusOfWhiteRing
				);

				cellPosInCells.overwriteWith
				(
					cellOffsetInCells
				).add
				(
					posInCells
				);

				drawPos.overwriteWith
				(
					cellPosInCells
				).multiply
				(
					cellSizeInPixels
				);

				graphics.fillStyle = (isCellWhite ? "White" : "Black");

				graphics.fillRect
				(
					drawPos.x, drawPos.y,
					cellSizeInPixels.x, cellSizeInPixels.y
				);

				graphics.strokeRect
				(
					drawPos.x, drawPos.y,
					cellSizeInPixels.x, cellSizeInPixels.y
				);
			}
		}
	}

	version()
	{
		return QrCodeVersion.byId(this.versionId);
	}
}
