
class QrCodeByteRegion
{
	// In a QR code, each set of 8 bits (a byte)
	// is grouped into a region of adjacent cells.
	// Or, where there's no room,
	// like when an alignment box is in the way,
	// two regions of adjacent cells.
	// The first few regions are rectangular,
	// but most must be irregularly-shaped
	// in order to fit in the spaces provded.
	// Within a region type,
	// the bits are arranged at particular,
	// though not necessarily obvious, offsets.
	// Also, two region types of the same external shape
	// may have the bits arranged in a different order.

	constructor(shapeName, positionOfUpperLeftCell)
	{
		this.shapeName = shapeName;
		this.positionOfUpperLeftCell = positionOfUpperLeftCell;
	}

	shape()
	{
		return QrCodeByteRegionShape.byName(this.shapeName);
	}
}